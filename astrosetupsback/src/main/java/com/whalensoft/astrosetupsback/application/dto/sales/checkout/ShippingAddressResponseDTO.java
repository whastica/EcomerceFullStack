package com.whalensoft.astrosetupsback.application.dto.sales.checkout;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingAddressResponseDTO {

    private Long id;

    private String address;

    private String cityName;

    private String postalCode;

    /** Indica si es la dirección principal del usuario */
    private Boolean defaultAddress;

    /** Cantidad de órdenes que han usado esta dirección */
    private Integer totalOrdersUsingThisAddress;
}