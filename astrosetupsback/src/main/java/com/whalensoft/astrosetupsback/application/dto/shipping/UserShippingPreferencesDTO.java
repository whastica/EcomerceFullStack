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

    /**
     * Lista de direcciones guardadas por el usuario
     */
    private List<ShippingAddressSummaryDTO> addresses;

    /**
     * Dirección principal del usuario
     */
    private ShippingAddressSummaryDTO defaultAddress;

    /**
     * Cantidad total de direcciones registradas
     */
    private Integer totalAddresses;

    /**
     * Ciudad preferida calculada a partir de su dirección principal
     * o comportamiento de compra.
     */
    private CitySummaryDTO preferredCity;
}