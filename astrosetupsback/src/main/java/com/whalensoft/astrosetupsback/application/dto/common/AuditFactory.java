package com.whalensoft.astrosetupsback.application.dto.common;

import java.time.Instant;
import java.util.Map;

public final class AuditFactory {

    public static AuditDTO create(
            String entityType,
            Long entityId,
            String action,
            String userId,
            String userEmail,
            Map<String, Object> oldValues,
            Map<String, Object> newValues,
            String ipAddress,
            String userAgent
    ) {
        return new AuditDTO(
                entityType,
                entityId,
                action,
                userId,
                userEmail,
                Instant.now(),
                oldValues,
                newValues,
                ipAddress,
                userAgent
        );
    }
}