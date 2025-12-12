package com.whalensoft.astrosetupsback.application.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.Map;

import java.time.Instant;
import java.util.Map;

public record AuditDTO(
        String entityType,
        Long entityId,
        String action,
        String userId,
        String userEmail,
        Instant timestamp,
        Map<String, Object> oldValues,
        Map<String, Object> newValues,
        String ipAddress,
        String userAgent
) {}