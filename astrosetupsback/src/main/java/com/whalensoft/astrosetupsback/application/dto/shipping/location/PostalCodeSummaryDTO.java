package com.whalensoft.astrosetupsback.application.dto.shipping.location;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostalCodeSummaryDTO {

    private Long id;
    private String code;

    private Long cityId;
    private String cityName;

    // Estadísticas útiles para panel administrativo
    private Integer shippingAddressesCount;
    private Integer usersCount;
}