package com.whalensoft.astrosetupsback.application.dto.common;

import java.time.LocalDateTime;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationDTO {
    private String recipient;
    private String subject;
    private String message;
    private String type; // EMAIL, SMS, PUSH
    @Builder.Default
    private Boolean urgent = false;
    private LocalDateTime scheduledFor;
    private Map<String, Object> templateData;
}
