package com.whalensoft.astrosetupsback.application.dto.shipping.location;

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
public class PostalCodeDTO {

    private Long id;

    @NotBlank(message = "El código postal es obligatorio")
    @Size(max = 20, message = "El código postal no puede exceder 20 caracteres")
    private String code;

    // Información mínima y necesaria (sin exponer CityDTO completo)
    private Long cityId;
    private String cityName;
}