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
public class OrderSummaryDTO {
    private Long id;
    private Double total;
    private LocalDateTime orderDate;
    private OrderStatus status;
    private PaymentMethod paymentMethod;
    private String userFullName;
    private Integer totalItems;
    private String firstProductName; // Para mostrar "Producto X y 2 más"
}