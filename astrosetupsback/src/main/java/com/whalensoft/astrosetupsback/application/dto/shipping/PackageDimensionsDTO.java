package com.whalensoft.astrosetupsback.application.dto.shipping;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PackageDimensionsDTO {

    /**
     * Longitud del paquete en centímetros.
     */
    @NotNull(message = "La longitud es obligatoria")
    @DecimalMin(value = "0.1", message = "La longitud debe ser mayor a 0")
    @DecimalMax(value = "300", message = "La longitud no debe superar los 300 cm")
    private BigDecimal length;

    /**
     * Ancho del paquete en centímetros.
     */
    @NotNull(message = "El ancho es obligatorio")
    @DecimalMin(value = "0.1", message = "El ancho debe ser mayor a 0")
    @DecimalMax(value = "300", message = "El ancho no debe superar los 300 cm")
    private BigDecimal width;

    /**
     * Altura del paquete en centímetros.
     */
    @NotNull(message = "La altura es obligatoria")
    @DecimalMin(value = "0.1", message = "La altura debe ser mayor a 0")
    @DecimalMax(value = "300", message = "La altura no debe superar los 300 cm")
    private BigDecimal height;
}