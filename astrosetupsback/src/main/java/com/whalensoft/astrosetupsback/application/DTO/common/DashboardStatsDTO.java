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
public class DashboardStatsDTO {
    private List<StatisticsDTO> generalStats;
    private List<StatisticsDTO> salesStats;
    private List<StatisticsDTO> userStats;
    private List<StatisticsDTO> productStats;
    private LocalDateTime lastUpdated;
    private String timeframe;
}