package com.whalensoft.astrosetupsback.application.dto.common;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class ApiResponseFactory {

    public <T> ApiResponseDTO<T> success(T data, String message, HttpServletRequest request) {
        return new ApiResponseDTO<>(
                true,
                message,
                data,
                Instant.now(),
                request != null ? request.getRequestURI() : null
        );
    }

    public <T> ApiResponseDTO<T> success(T data, HttpServletRequest request) {
        return success(data, "Operación exitosa", request);
    }

    public ApiResponseDTO<Void> error(String message, HttpServletRequest request) {
        return new ApiResponseDTO<>(
                false,
                message,
                null,
                Instant.now(),
                request != null ? request.getRequestURI() : null
        );
    }
}
