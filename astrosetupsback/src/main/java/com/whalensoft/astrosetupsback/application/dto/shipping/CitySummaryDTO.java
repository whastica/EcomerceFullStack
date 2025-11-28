package com.whalensoft.astrosetupsback.application.dto.shipping;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CitySummaryDTO {

    private Long id;

    private String name;

    @NotNull(message = "El conteo de usuarios no puede ser nulo")
    @PositiveOrZero(message = "El conteo de usuarios no puede ser negativo")
    private Integer usersCount;

    @NotNull(message = "El conteo de direcciones no puede ser nulo")
    @PositiveOrZero(message = "El conteo de direcciones no puede ser negativo")
    private Integer shippingAddressesCount;
}