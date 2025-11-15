package com.whalensoft.astrosetupsback.application.dto.customer.Users;

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
    private String firstName;
    private String lastName;
    private String phone;

    private Long cityId;
    private Long postalCodeId;

    @Size(max = 255)
    private String address; // opcional, futura factura
}