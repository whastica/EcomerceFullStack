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
    private String address;
    private String cityName;
    private String postalCode;
    private Boolean isDefault;
}