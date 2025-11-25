package com.whalensoft.astrosetupsback.application.dto.sales.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartSummaryDTO {

    /** Totales económicos */
    private BigDecimal subtotal;            // Total sin descuentos
    private BigDecimal totalDiscount;       // Descuento total aplicado
    private BigDecimal total;               // subtotal - totalDiscount

    /** Cantidades */
    private Integer totalItems;             // Total de productos (sumado)
    private Integer distinctItems;          // Cantidad de ítems distintos

    /** Estado del carrito */
    private Boolean expired;
    private LocalDateTime expiresAt;

    /** Información del cupón aplicado (si hay) */
    private Boolean hasAppliedPromoCode;
    private String appliedPromoCode;
    private BigDecimal promoDiscount;       // Descuento específico del cupón

    /** Fecha estimada de entrega */
    private LocalDateTime estimatedDeliveryDate;
}