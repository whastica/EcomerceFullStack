package com.whalensoft.astrosetupsback.application.dto.shipping;

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
    private Long userId;
    private String userFullName;
    private String address;
    private CityDTO city;
    private PostalCodeDTO postalCode;
    private Boolean isDefault;
    private Integer ordersCount; // Número de órdenes asociadas a esta dirección
}
