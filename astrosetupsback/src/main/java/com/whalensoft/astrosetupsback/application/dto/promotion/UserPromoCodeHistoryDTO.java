package com.whalensoft.astrosetupsback.application.dto.promotion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPromoCodeHistoryDTO {

    // Código utilizado
    private String promoCode;

    // Tipo de descuento aplicado (porcentaje, monto fijo, free shipping)
    private PromoDiscountType discountType;

    // Valor del descuento según el tipo
    // - Porcentaje: 10.0 (representa 10%)
    // - Monto fijo: $15.0
    // - Free shipping: 0.0
    private Double discountValue;

    // Descuento final aplicado en el pedido (lo que realmente se descontó)
    private Double discountApplied;

    // Fecha exacta en la que el usuario aplicó el código
    private LocalDateTime applicationDate;

    // Información del pedido
    private Long orderId;
    private String orderStatus;
    private Double orderTotal;
}