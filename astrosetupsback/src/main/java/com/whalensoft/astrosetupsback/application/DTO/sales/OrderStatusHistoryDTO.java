package com.whalensoft.astrosetupsback.application.DTO.sales;

import com.whalensoft.astrosetupsback.domain.model.OrderStatus;
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
public class OrderStatusHistoryDTO {
    private OrderStatus status;
    private LocalDateTime timestamp;
    private String observation;
}
