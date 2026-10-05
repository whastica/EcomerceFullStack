package com.whalensoft.astrosetupsback.infra.exceptions;

import com.whalensoft.astrosetupsback.application.dto.common.ErrorResponseDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorResponseDTO> handleInvalidCredentials(
            InvalidCredentialsException ex, HttpServletRequest request) {
        log.warn("Credenciales invalidas en {} - {}", request.getRequestURI(), ex.getMessage());
        ErrorResponseDTO error = ErrorResponseDTO.create(
                ex.getMessage(), "INVALID_CREDENTIALS", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    @ExceptionHandler(AccountDisabledException.class)
    public ResponseEntity<ErrorResponseDTO> handleAccountDisabled(
            AccountDisabledException ex, HttpServletRequest request) {
        log.warn("Cuenta deshabilitada en {} - {}", request.getRequestURI(), ex.getMessage());
        ErrorResponseDTO error = ErrorResponseDTO.create(
                ex.getMessage(), "ACCOUNT_DISABLED", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponseDTO> handleAccessDenied(
            AccessDeniedException ex, HttpServletRequest request) {
        log.warn("Acceso denegado en {} - {}", request.getRequestURI(), ex.getMessage());
        ErrorResponseDTO error = ErrorResponseDTO.create(
                ex.getMessage(), "ACCESS_DENIED", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
    }

    @ExceptionHandler(jakarta.persistence.EntityNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleEntityNotFound(
            jakarta.persistence.EntityNotFoundException ex, HttpServletRequest request) {
        log.warn("Recurso no encontrado en {} - {}", request.getRequestURI(), ex.getMessage());
        ErrorResponseDTO error = ErrorResponseDTO.create(
                ex.getMessage(), "NOT_FOUND", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    // Ruta inexistente -> 404 con formato ErrorResponseDTO consistente
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleNoResourceFound(
            NoResourceFoundException ex, HttpServletRequest request) {
        log.warn("Ruta no encontrada: {} {}", request.getMethod(), request.getRequestURI());
        ErrorResponseDTO error = ErrorResponseDTO.create(
                "El recurso solicitado no existe", "NOT_FOUND", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponseDTO> handleIllegalArgument(
            IllegalArgumentException ex, HttpServletRequest request) {
        log.warn("Argumento invalido en {} - {}", request.getRequestURI(), ex.getMessage());
        ErrorResponseDTO error = ErrorResponseDTO.create(
                ex.getMessage(), "BAD_REQUEST", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    // Body malformado o ausente -> 400 (en vez de 500 generico)
    @ExceptionHandler(org.springframework.http.converter.HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponseDTO> handleNotReadable(
            org.springframework.http.converter.HttpMessageNotReadableException ex, HttpServletRequest request) {
        log.warn("Body ilegible en {} - {}", request.getRequestURI(), ex.getMessage());
        ErrorResponseDTO error = ErrorResponseDTO.create(
                "Cuerpo de la peticion invalido o ausente", "BAD_REQUEST", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponseDTO> handleRuntimeException(
            RuntimeException ex, HttpServletRequest request) {
        // Log completo del stack trace en servidor; al cliente solo mensaje generico
        // (evita fugas de informacion interna)
        log.error("Error no controlado en {} {}", request.getMethod(), request.getRequestURI(), ex);
        ErrorResponseDTO error = ErrorResponseDTO.create(
                "Error interno del servidor", "INTERNAL_ERROR", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDTO> handleValidationErrors(
            MethodArgumentNotValidException ex, HttpServletRequest request) {
        List<com.whalensoft.astrosetupsback.application.dto.common.ValidationErrorDTO> errors =
                ex.getBindingResult().getFieldErrors().stream()
                        .map(fieldError -> com.whalensoft.astrosetupsback.application.dto.common.ValidationErrorDTO.builder()
                                .field(fieldError.getField())
                                .message(fieldError.getDefaultMessage())
                                .rejectedValue(fieldError.getRejectedValue())
                                .build())
                        .collect(Collectors.toList());

        log.warn("Error de validacion en {} - {} campos invalidos",
                request.getRequestURI(), errors.size());

        ErrorResponseDTO error = ErrorResponseDTO.createWithValidations(
                "Error de validación", "VALIDATION_ERROR", request.getRequestURI(), errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
}
