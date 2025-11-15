package com.whalensoft.astrosetupsback.application.dto.customer.Address;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateShippingAddressDTO {

    @NotBlank(message = "La dirección es obligatoria")
    @Size(max = 255, message = "La dirección no puede exceder 255 caracteres")
    private String address;

    @NotNull(message = "La ciudad es obligatoria")
    private Long cityId;

    private Long postalCodeId;

    // Opcional, útil para UX
    @Builder.Default
    private Boolean setAsDefault = false;
}