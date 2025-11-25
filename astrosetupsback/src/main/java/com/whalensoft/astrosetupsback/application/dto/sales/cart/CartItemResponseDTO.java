package com.whalensoft.astrosetupsback.application.dto.sales.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemResponseDTO {

    /** ID del ítem del carrito */
    private Long id;

    /** Información del producto */
    private Long productId;
    private String productName;
    private String productSlug;        // Recomendado
    private String productImageUrl;

    /** Cantidad seleccionada */
    private Integer quantity;

    /** Precio y cálculos */
    private BigDecimal unitPrice;          // precio real
    private BigDecimal originalSubtotal;   // unitPrice * quantity
    private BigDecimal discountAmount;     // total descontado
    private BigDecimal finalSubtotal;      // originalSubtotal - discountAmount

    /** Estado del producto */
    private Boolean available;             // antes isAvailable
    private Boolean hasExistingDiscount;

    /** Opcional: detalles informativos */
    private String discountDescription;    // "Cupón NAVIDAD aplicado"
    private String availabilityMessage;    // "Disponible bajo pedido"
}