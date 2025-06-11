package com.whalensoft.astrosetupsback.application.DTO.common;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileUploadDTO {
    @NotBlank(message = "El nombre del archivo es obligatorio")
    private String fileName;

    @NotBlank(message = "El tipo de archivo es obligatorio")
    private String fileType;

    @NotNull(message = "El tamaño del archivo es obligatorio")
    @Min(value = 1, message = "El archivo debe tener contenido")
    private Long fileSize;

    private String fileUrl;
    private String filePath;
    private String category; // PRODUCT_IMAGE, USER_AVATAR, DOCUMENT, etc.
    private Boolean isPublic = true;
    private LocalDateTime uploadedAt;
}