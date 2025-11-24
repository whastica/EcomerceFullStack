package com.whalensoft.astrosetupsback.application.dto.promotion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromoCodeValidationResultDTO {

    // Si el código es válido (existe, no está expirado, está activo)
    private Boolean valid;

    // Si puede aplicarse al carrito actual (reglas, productos, monto mínimo, etc.)
    private Boolean applicable;

    private String promoCode;

    // Tipo de descuento (percentage, fixed, freeShipping)
    private PromoDiscountType discountType;

    // Porcentaje o valor fijo, según el tipo
    private Double discountValue;

    // Descuento estimado basado en el carrito enviado
    private Double estimatedDiscountAmount;

    // Mensajes de validación (errores, advertencias, razones)
    private List<String> validationMessages;

    // Datos útiles extra para mejorar UX
    private Integer remainingUses;
    private LocalDateTime expirationDate;
}