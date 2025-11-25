package com.whalensoft.astrosetupsback.application.dto.sales.orders;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemResponseDTO {

    /** ID del ítem de la orden */
    private Long id;

    /** Información del producto */
    private Long productId;
    private String productName;
    private String productSlug;         // Opcional: útil para URLs en frontend
    private String productImageUrl;

    /** Cantidad solicitada */
    private Integer quantity;

    /** Precio y cálculos */
    private BigDecimal unitPrice;       // Precio unitario real
    private BigDecimal originalSubtotal; // unitPrice * quantity
    private BigDecimal discountAmount;   // Total descontado aplicado a este ítem
    private BigDecimal finalSubtotal;    // originalSubtotal - discountAmount

    /** Información adicional */
    private Boolean available;          // Indica si el producto sigue disponible
    private Boolean hasExistingDiscount; // Si el producto tenía descuento comercial
    private String discountDescription;  // Ej: "Cupón NAVIDAD aplicado"
}