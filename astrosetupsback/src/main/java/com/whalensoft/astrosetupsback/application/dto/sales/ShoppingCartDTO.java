package com.whalensoft.astrosetupsback.application.dto.sales;

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
public class ShoppingCartDTO {
    private Long id;
    private Long userId;
    private LocalDateTime expiration;
    private List<CartItemDTO> cartItems;
    private Double total;
    private Integer totalItems;
    private Boolean isExpired;
}