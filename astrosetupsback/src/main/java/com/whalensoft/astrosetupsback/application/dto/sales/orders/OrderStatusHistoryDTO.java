package com.whalensoft.astrosetupsback.application.dto.sales.orders;

import com.whalensoft.astrosetupsback.domain.model.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderStatusHistoryDTO {

    /** Estado de la orden en este registro */
    @NotNull(message = "El estado de la orden es obligatorio")
    private OrderStatus status;

    /** Momento en que se registró este estado */
    @NotNull(message = "La fecha y hora del registro es obligatoria")
    private LocalDateTime timestamp;

    /** Observaciones o comentarios sobre este cambio de estado */
    @Builder.Default
    private String observation = "";
}