package com.whalensoft.astrosetupsback.application.DTO.common;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public final class ApiResponseDTO<T> {
    private Boolean success;
    private String message;
    private T data;
    private String timestamp;
    private String path;

    public static <T> ApiResponseDTO<T> success(T data) {
        return success(data, "Operación exitosa");
    }

    public static <T> ApiResponseDTO<T> success(T data, String message) {
        ApiResponseDTO<T> response = new ApiResponseDTO<>();
        response.success = true;
        response.message = message;
        response.data = data;
        response.timestamp = LocalDateTime.now().toString();
        response.path = null;
        return response;
    }

    public static <T> ApiResponseDTO<T> error(String message) {
        ApiResponseDTO<T> response = new ApiResponseDTO<>();
        response.success = false;
        response.message = message;
        response.data = null;
        response.timestamp = LocalDateTime.now().toString();
        response.path = null;
        return response;
    }
}