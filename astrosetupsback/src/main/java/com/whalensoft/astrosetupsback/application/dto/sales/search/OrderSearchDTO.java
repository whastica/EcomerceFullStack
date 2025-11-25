package com.whalensoft.astrosetupsback.application.dto.sales.search;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.whalensoft.astrosetupsback.domain.model.OrderStatus;
import com.whalensoft.astrosetupsback.domain.model.PaymentMethod;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderSearchDTO {

    /** Filtros de cliente */
    private String customerEmail;
    private String customerName;
    private Long userId;

    /** Filtros de orden */
    private Long orderId;
    private OrderStatus status;
    private PaymentMethod paymentMethod;

    /** Rango de fechas para la búsqueda */
    private LocalDateTime startDate; // inclusive
    private LocalDateTime endDate;   // inclusive

    /** Rango de totales */
    private BigDecimal minTotal;
    private BigDecimal maxTotal;

    /** Ordenamiento */
    private OrderSortBy sortBy;
    private SortDirection sortDirection;

    /** Paginación */
    @Builder.Default
    private Integer page = 0;
    @Builder.Default
    private Integer size = 20;

    /** Enums para sortBy y direction */
    public enum OrderSortBy {
        DATE, TOTAL, STATUS
    }

    public enum SortDirection {
        ASC, DESC
    }
}