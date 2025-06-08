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
public class UpdateOrderStatusDTO {
    @NotNull(message = "El estado es obligatorio")
    private OrderStatus status;

    @Size(max = 500, message = "La observación no puede exceder 500 caracteres")
    private String observation;
}
