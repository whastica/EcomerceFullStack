package com.whalensoft.astrosetupsback.application.dto.promotion;

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

    // Tipo de descuento NO se debe permitir modificar
    // Private: solo lectura, evita confusión en el frontend.
    // Si quieres, se puede eliminar completamente del DTO.
    private PromoDiscountType discountType;

    // Valor del descuento: porcentaje, valor fijo o null (si free shipping)
    @DecimalMin(value = "0.01", message = "El descuento debe ser mayor a 0")
    private Double discountValue;

    private LocalDateTime expirationDate;

    @Min(value = 0, message = "Los usos restantes no pueden ser negativos")
    private Integer remainingUses;

    // Regla: solo aplica a productos no rebajados
    private Boolean forDiscountedProductsOnly;

    private Boolean active;
}