package com.whalensoft.astrosetupsback.application.dto.customer.Address;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserShippingAddressDTO {
    private Long id;
    private String address;
    private String cityName;
    private String postalCode;
    private Boolean defaultAddress;

    private Integer totalOrdersUsingThisAddress;
}