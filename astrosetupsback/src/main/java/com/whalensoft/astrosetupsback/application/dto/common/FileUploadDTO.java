package com.whalensoft.astrosetupsback.application.dto.common;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @Builder.Default
    private Boolean isPublic = true;
    private LocalDateTime uploadedAt;
}