package com.whalensoft.astrosetupsback.application.dto.Promotion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromoCodeValidationDTO {
    @NotBlank(message = "El código promocional es obligatorio")
    private String promoCode;

    @NotNull(message = "El ID del usuario es obligatorio")
    private Long userId;

    @NotNull(message = "El subtotal es obligatorio")
    @DecimalMin(value = "0.01", message = "El subtotal debe ser mayor a 0")
    private Double subtotal;

    @Builder.Default
    private Boolean hasDiscountedProducts = false;
}
