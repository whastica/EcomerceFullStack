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
public class OrderItemDTO {
    private Long id;
    private Long productId;
    private String productName;
    private Integer quantity;
    private Double finalPrice;
    private Double subtotal;
    private String productImageUrl;
}