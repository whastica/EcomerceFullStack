package com.whalensoft.astrosetupsback.application.DTO.common;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponseDTO {
    private Boolean success = false;
    private String message;
    private String errorCode;
    private String timestamp;
    private String path;
    private List<ValidationErrorDTO> validationErrors;

    public static ErrorResponseDTO create(String message, String errorCode, String path) {
        ErrorResponseDTO response = new ErrorResponseDTO();
        response.success = false;
        response.message = message;
        response.errorCode = errorCode;
        response.timestamp = LocalDateTime.now().toString();
        response.path = path;
        response.validationErrors = null;
        return response;
    }

    // Método adicional para errores con validaciones
    public static ErrorResponseDTO createWithValidations(String message, String errorCode, String path, List<ValidationErrorDTO> validationErrors) {
        ErrorResponseDTO response = new ErrorResponseDTO();
        response.success = false;
        response.message = message;
        response.errorCode = errorCode;
        response.timestamp = LocalDateTime.now().toString();
        response.path = path;
        response.validationErrors = validationErrors;
        return response;
    }

    // Método para errores simples sin path
    public static ErrorResponseDTO create(String message, String errorCode) {
        ErrorResponseDTO response = new ErrorResponseDTO();
        response.success = false;
        response.message = message;
        response.errorCode = errorCode;
        response.timestamp = LocalDateTime.now().toString();
        response.path = null;
        response.validationErrors = null;
        return response;
    }
}
