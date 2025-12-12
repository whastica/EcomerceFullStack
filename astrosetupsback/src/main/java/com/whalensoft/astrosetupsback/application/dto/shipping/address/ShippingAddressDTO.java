package com.whalensoft.astrosetupsback.application.dto.shipping.address;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingAddressDTO {

    private Long id;

    private String recipientName;
    private String phone;

    private String addressLine1;
    private String addressLine2;

    private Long countryId;
    private String countryName;

    private Long stateId;
    private String stateName;

    private Long cityId;
    private String cityName;

    private Long postalCodeId;
    private String postalCode;

    private Boolean isDefault;
}