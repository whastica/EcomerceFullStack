package com.whalensoft.astrosetupsback.application.dto.shipping;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingZoneDTO {

    private Long id;

    private String name;

    private List<CitySummaryDTO> cities;

    private BigDecimal baseCost;

    private Integer deliveryDays;

    private Boolean expressAvailable;
}