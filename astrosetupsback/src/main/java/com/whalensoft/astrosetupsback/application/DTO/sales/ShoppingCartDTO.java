package com.whalensoft.astrosetupsback.application.DTO.sales;

import com.whalensoft.astrosetupsback.domain.model.OrderStatus;
import com.whalensoft.astrosetupsback.domain.model.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;
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