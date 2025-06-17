package com.whalensoft.astrosetupsback.application.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

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