package com.whalensoft.astrosetupsback.application.dto.shipping;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingStatsDTO {
    private Long totalShippingAddresses;
    private Long totalCities;
    private Long totalPostalCodes;
    private Long activeShippingAddresses;
    private String mostPopularCity;
    private Long ordersWithShipping;
    private Double averageShippingCost;
}