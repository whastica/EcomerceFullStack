package com.whalensoft.astrosetupsback.application.dto.shipping.cost;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


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