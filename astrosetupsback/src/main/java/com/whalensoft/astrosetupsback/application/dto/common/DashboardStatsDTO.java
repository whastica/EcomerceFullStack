package com.whalensoft.astrosetupsback.application.dto.common;


import java.util.List;


import java.time.Instant;

public record DashboardStatsDTO(
        List<StatisticsDTO> generalStats,
        List<StatisticsDTO> salesStats,
        List<StatisticsDTO> userStats,
        List<StatisticsDTO> productStats,
        Instant lastUpdated,
        Timeframe timeframe
) {}