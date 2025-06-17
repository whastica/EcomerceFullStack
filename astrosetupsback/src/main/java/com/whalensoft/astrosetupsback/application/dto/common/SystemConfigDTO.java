package com.whalensoft.astrosetupsback.application.dto.common;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SystemConfigDTO {
    private String configKey;
    private String configValue;
    private String description;
    private String category;
    @Builder.Default
    private Boolean editable = true;
    private LocalDateTime lastModified;
    private String modifiedBy;
}