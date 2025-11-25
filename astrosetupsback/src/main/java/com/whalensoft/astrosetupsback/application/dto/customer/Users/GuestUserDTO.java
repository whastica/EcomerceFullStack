package com.whalensoft.astrosetupsback.application.dto.customer.Users;

import jakarta.validation.constraints.Email;
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
public class GuestUserDTO {

    @NotBlank(message = "El nombre es obligatorio")
    private String fullName;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo no es válido")
    private String email;

    @NotBlank(message = "El número de teléfono es obligatorio")
    @Size(min = 7, max = 20, message = "El teléfono no es válido")
    private String phone;

    /**
     * Dirección completa para invitados.
     * Los usuarios registrados usan una addressId, pero aquí se envía en crudo.
     */
    @NotBlank(message = "La dirección de envío es obligatoria")
    private String shippingAddress;

    @NotBlank(message = "La ciudad es obligatoria")
    private String city;

    @NotBlank(message = "El código postal es obligatorio")
    private String postalCode;
}