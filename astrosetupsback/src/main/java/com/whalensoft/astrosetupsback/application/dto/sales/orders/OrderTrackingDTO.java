package com.whalensoft.astrosetupsback.application.dto.sales.orders;

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

    /** ID de la orden */
    private Long orderId;

    /** Estado actual de la orden */
    private OrderStatus currentStatus;

    /** Fecha de creación de la orden */
    private LocalDateTime orderDate;

    /** Fecha estimada de entrega calculada por backend */
    private LocalDateTime estimatedDelivery;

    /** Historial de estados más recientes, opcionalmente limitado a los últimos N cambios */
    private List<OrderStatusHistoryDTO> statusHistory;
}