package com.whalensoft.astrosetupsback.application.dto.sales;

import com.whalensoft.astrosetupsback.domain.model.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;

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
