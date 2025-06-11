package com.whalensoft.astrosetupsback.application.DTO.shipping;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingCostCalculationDTO {
    @NotNull(message = "La ciudad de destino es obligatoria")
    private Long destinationCityId;

    private Long postalCodeId;

    @NotNull(message = "El peso del paquete es obligatorio")
    @DecimalMin(value = "0.1", message = "El peso debe ser mayor a 0")
    private Double packageWeight;

    @NotNull(message = "Las dimensiones del paquete son obligatorias")
    private PackageDimensionsDTO dimensions;
}