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
public class HealthCheckDTO {
    private String status; // UP, DOWN, DEGRADED
    private String service;
    private LocalDateTime timestamp;
    private Long responseTime;
    private String version;
    private Map<String, Object> details;
}