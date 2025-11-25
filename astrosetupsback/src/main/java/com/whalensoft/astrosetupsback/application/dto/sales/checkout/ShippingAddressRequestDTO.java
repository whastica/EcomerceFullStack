package com.whalensoft.astrosetupsback.application.dto.sales.checkout;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingAddressRequestDTO {

    /** Dirección física completa */
    @NotBlank(message = "La dirección es obligatoria")
    @Size(max = 255, message = "La dirección no puede exceder 255 caracteres")
    private String address;

    /** Nombre de la ciudad */
    @NotBlank(message = "El nombre de la ciudad es obligatorio")
    @Size(max = 100, message = "El nombre de la ciudad no puede exceder 100 caracteres")
    private String cityName;

    /** Código postal */
    @NotBlank(message = "El código postal es obligatorio")
    @Size(max = 20, message = "El código postal no puede exceder 20 caracteres")
    private String postalCode;

    /** Indica si esta será la dirección principal del usuario */
    @Builder.Default
    private Boolean defaultAddress = false;
}