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
public class UpdateUserDTO {
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    private String firstName;

    @Size(max = 100, message = "El apellido no puede exceder 100 caracteres")
    private String lastName;

    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "El formato del teléfono no es válido")
    private String phone;

    @Size(max = 255, message = "La dirección no puede exceder 255 caracteres")
    private String address;

    private Long cityId;
    private Long postalCodeId;
}
