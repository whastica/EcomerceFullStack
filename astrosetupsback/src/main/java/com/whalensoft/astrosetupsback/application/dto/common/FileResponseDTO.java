package com.whalensoft.astrosetupsback.application.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileResponseDTO {
    private String fileName;
    private String fileUrl;
    private String fileType;
    private Long fileSize;
    private String message;
    private Boolean success;
    private LocalDateTime uploadedAt;
}