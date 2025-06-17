package com.whalensoft.astrosetupsback.application.dto.sales;

import com.whalensoft.astrosetupsback.domain.model.OrderStatus;
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
public class OrderTrackingDTO {
    private Long id;
    private OrderStatus status;
    private LocalDateTime orderDate;
    private LocalDateTime estimatedDelivery;
    private List<OrderStatusHistoryDTO> statusHistory;
    private ShippingAddressDTO shippingAddress;
}
