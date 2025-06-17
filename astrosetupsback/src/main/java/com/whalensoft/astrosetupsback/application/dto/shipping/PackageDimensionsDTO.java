package com.whalensoft.astrosetupsback.application.dto.shipping;

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
public class PackageDimensionsDTO {
    @NotNull(message = "La longitud es obligatoria")
    @DecimalMin(value = "1", message = "La longitud debe ser mayor a 0")
    private Double length;

    @NotNull(message = "El ancho es obligatorio")
    @DecimalMin(value = "1", message = "El ancho debe ser mayor a 0")
    private Double width;

    @NotNull(message = "La altura es obligatoria")
    @DecimalMin(value = "1", message = "La altura debe ser mayor a 0")
    private Double height;
}