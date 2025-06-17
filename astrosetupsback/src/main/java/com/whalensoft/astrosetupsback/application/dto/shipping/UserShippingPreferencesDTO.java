package com.whalensoft.astrosetupsback.application.dto.shipping;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserShippingPreferencesDTO {
    private Long userId;
    private List<ShippingAddressSummaryDTO> addresses;
    private ShippingAddressSummaryDTO defaultAddress;
    private Integer totalAddresses;
    private String preferredCity;
}