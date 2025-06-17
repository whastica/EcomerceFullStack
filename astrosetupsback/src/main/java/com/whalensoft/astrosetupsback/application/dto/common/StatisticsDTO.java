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
public class StatisticsDTO {
    private String label;
    private Long count;
    private Double percentage;
    private String period; // DAILY, WEEKLY, MONTHLY, YEARLY
    private LocalDateTime periodStart;
    private LocalDateTime periodEnd;
    private String category;
}