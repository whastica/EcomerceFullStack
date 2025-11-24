package com.whalensoft.astrosetupsback.application.dto.sales;

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

    private Long id;

    private Long productId;
    private String productName;

    private Integer quantity;

    /** Precio unitario real calculado */
    private BigDecimal unitPrice;

    /** Subtotal sin descuentos */
    private BigDecimal originalSubtotal;

    /** Monto descontado por promociones o cupones */
    private BigDecimal discountAmount;

    /** Subtotal final después de descuentos */
    private BigDecimal finalSubtotal;

    private String productImageUrl;

    /** Indica si el producto sigue disponible en el catálogo */
    private Boolean isAvailable;

    /** Indica si el producto tiene descuento comercial aplicado */
    private Boolean hasExistingDiscount;
}