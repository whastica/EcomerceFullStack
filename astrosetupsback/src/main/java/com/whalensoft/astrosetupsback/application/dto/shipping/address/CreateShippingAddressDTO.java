package com.whalensoft.astrosetupsback.application.dto.shipping.address;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateShippingAddressDTO {

    @NotNull(message = "El país es obligatorio")
    private Long countryId;

    @NotNull(message = "El estado o departamento es obligatorio")
    private Long stateId;

    @NotNull(message = "La ciudad es obligatoria")
    private Long cityId;

    private Long postalCodeId;

    @NotBlank(message = "La línea de dirección es obligatoria")
    @Size(max = 255, message = "La dirección no puede exceder 255 caracteres")
    private String addressLine1;

    @Size(max = 255, message = "La dirección secundaria no puede exceder 255 caracteres")
    private String addressLine2;

    @NotBlank(message = "El nombre del destinatario es obligatorio")
    private String recipientName;

    @NotBlank(message = "El número de teléfono es obligatorio")
    @Pattern(regexp = "^[0-9+\\- ]{7,20}$", message = "El número de teléfono no es válido")
    private String phone;

    @Builder.Default
    private Boolean isDefault = false;
}