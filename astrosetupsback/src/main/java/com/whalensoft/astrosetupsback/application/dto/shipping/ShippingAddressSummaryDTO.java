package com.whalensoft.astrosetupsback.application.dto.shipping;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingAddressSummaryDTO {

    private Long id;
    private String recipientName;
    private String addressLine1;

    private String cityName;
    private String stateName;
    private String countryName;

    private Boolean isDefault;

    private Integer ordersCount;
}