package com.whalensoft.astrosetupsback.application.dto.sales.search;

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
    private String customerEmail;
    private String customerName;
    private OrderStatus status;
    private PaymentMethod paymentMethod;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Double minTotal;
    private Double maxTotal;
    private String sortBy; // "date", "total", "status"
    private String sortDirection; // "asc", "desc"
    @Builder.Default
    private Integer page = 0;
    @Builder.Default
    private Integer size = 20;
}