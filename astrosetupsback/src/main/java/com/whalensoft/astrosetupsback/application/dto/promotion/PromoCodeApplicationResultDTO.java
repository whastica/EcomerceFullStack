package com.whalensoft.astrosetupsback.application.dto.promotion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromoCodeApplicationResultDTO {

    private Boolean success;

    private String message; // Ej: "Cupón aplicado correctamente", "Cupón expirado", etc.

    private String promoCode;

    private PromoDiscountType discountType; // NUEVO: porcentaje, valor fijo o free_shipping

    private Double discountApplied; // El monto real descontado (en $)

    private Double originalAmount;

    private Double finalAmount;

    private Integer remainingUses;
}