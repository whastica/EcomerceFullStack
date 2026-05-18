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
    private Long id;
    private BigDecimal subtotal;
    private BigDecimal totalDiscount;
    private BigDecimal total;
    private Integer totalItems;
    private Integer distinctItems;
    private Boolean expired;
    private LocalDateTime expiresAt;
    private Boolean hasAppliedPromoCode;
    private String appliedPromoCode;
    private BigDecimal promoDiscount;
}