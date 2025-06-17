package com.whalensoft.astrosetupsback.application.dto.customer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateShippingAddressDTO {
    @Size(max = 255, message = "La dirección no puede exceder 255 caracteres")
    private String address;

    private Long cityId;
    private Long postalCodeId;
}