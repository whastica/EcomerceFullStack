package com.whalensoft.astrosetupsback.application.dto.sales.search;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemDTO {

    /** ID del ítem dentro de la orden */
    private Long id;

    /** Información del producto */
    private Long productId;
    private String productName;
    private String productImageUrl;

    /** Cantidad pedida */
    private Integer quantity;

    /** Precios y subtotales */
    private BigDecimal unitPrice;          // Precio unitario real
    private BigDecimal originalSubtotal;   // unitPrice * quantity
    private BigDecimal discountAmount;     // Total descontado aplicado
    private BigDecimal finalSubtotal;      // originalSubtotal - discountAmount

    /** Opcional: descripción del descuento aplicado, ej: "Cupón NAVIDAD aplicado" */
    private String discountDescription;
}