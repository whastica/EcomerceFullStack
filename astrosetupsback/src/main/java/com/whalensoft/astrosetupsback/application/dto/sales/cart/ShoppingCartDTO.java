package com.whalensoft.astrosetupsback.application.dto.sales.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShoppingCartDTO {

    private Long id;
    private Long userId;
    private String guestCartId;        // BE-C2.1 — soporte guest

    private List<CartItemDTO> cartItems;

    private BigDecimal total;
    private Integer totalItems;        // suma de quantities
    private Integer distinctItems;     // cantidad de ítems distintos

    private Boolean isExpired;
    private LocalDateTime expiration;
}