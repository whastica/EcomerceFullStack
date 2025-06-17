package com.whalensoft.astrosetupsback.application.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationDTO {
    private String recipient;
    private String subject;
    private String message;
    private String type; // EMAIL, SMS, PUSH
    private Boolean urgent = false;
    private LocalDateTime scheduledFor;
    private Map<String, Object> templateData;
}
