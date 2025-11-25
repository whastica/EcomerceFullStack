package com.whalensoft.astrosetupsback.application.dto.promotion.code;

import com.whalensoft.astrosetupsback.application.dto.promotion.enums.PromoDiscountType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePromoCodeDTO {

    @NotBlank(message = "El código promocional es obligatorio")
    @Size(min = 3, max = 50, message = "El código debe tener entre 3 y 50 caracteres")
    @Pattern(regexp = "^[A-Z0-9_-]+$",
            message = "El código solo puede contener letras mayúsculas, números, guiones y guiones bajos")
    private String code;

    @NotNull(message = "El tipo de descuento es obligatorio")
    private PromoDiscountType discountType;
    // PERCENTAGE, FIXED_AMOUNT, FREE_SHIPPING

    // Valor del descuento (solo para FIXED_AMOUNT o PERCENTAGE)
    @DecimalMin(value = "0.01", message = "El valor del descuento debe ser mayor a 0")
    private Double discountValue;

    // Subtotal mínimo para aplicar el cupón
    @DecimalMin(value = "0.01", message = "El monto mínimo debe ser mayor a 0")
    private Double minPurchaseAmount;

    private LocalDateTime expirationDate;

    /**
     * Usos permitidos:
     * - null = ilimitados
     * - >= 1 = limitado
     */
    @Min(value = 1, message = "Los usos restantes deben ser al menos 1")
    private Integer remainingUses;

    @Builder.Default
    private Boolean active = true;

    // Restricciones opcionales
    private List<Long> applicableProductIds;     // null = aplica a todos
    private List<Long> applicableCategoryIds;    // null = aplica a todos

    @Builder.Default
    private Boolean onlyForDiscountedProducts = false;
}