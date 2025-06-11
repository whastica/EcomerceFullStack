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
@Builder
public class ErrorResponseDTO {
    private Boolean success = false;
    private String message;
    private String errorCode;
    private String timestamp;
    private String path;
    private List<ValidationErrorDTO> validationErrors;

    public static ErrorResponseDTO create(String message, String errorCode, String path) {
        return ErrorResponseDTO.builder()
                .message(message)
                .errorCode(errorCode)
                .timestamp(LocalDateTime.now().toString())
                .path(path)
                .build();
    }
}
