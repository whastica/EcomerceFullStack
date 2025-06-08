package com.whalensoft.astrosetupsback.application.DTO.sales;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateShippingAddressDTO {
    @NotBlank(message = "La dirección es obligatoria")
    @Size(max = 200, message = "La dirección no puede exceder 200 caracteres")
    private String address;

    @NotNull(message = "La ciudad es obligatoria")
    private Long cityId;

    private Long postalCodeId;
}
