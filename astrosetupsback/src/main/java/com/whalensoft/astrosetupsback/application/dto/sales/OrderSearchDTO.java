package com.whalensoft.astrosetupsback.application.dto.sales;

import com.whalensoft.astrosetupsback.domain.model.OrderStatus;
import com.whalensoft.astrosetupsback.domain.model.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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
    private Integer page = 0;
    private Integer size = 20;
}