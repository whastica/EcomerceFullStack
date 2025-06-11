package com.whalensoft.astrosetupsback.application.DTO.Promotion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdatePromoCodeDTO {
    @DecimalMin(value = "0.01", message = "El descuento debe ser mayor a 0%")
    @DecimalMax(value = "100.0", message = "El descuento no puede ser mayor a 100%")
    private Double discountPercentage;

    private LocalDateTime expirationDate;

    @Min(value = 0, message = "Los usos restantes no pueden ser negativos")
    private Integer remainingUses;

    private Boolean forDiscountedProductsOnly;
    private Boolean active;
}
