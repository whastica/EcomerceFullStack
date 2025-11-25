package com.whalensoft.astrosetupsback.application.dto.sales.orders;

import com.whalensoft.astrosetupsback.domain.model.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateOrderStatusDTO {

    /** Nuevo estado de la orden; el backend valida transiciones válidas */
    @NotNull(message = "El estado es obligatorio")
    private OrderStatus status;

    /** Observaciones opcionales sobre el cambio de estado */
    @Size(max = 500, message = "La observación no puede exceder 500 caracteres")
    private String observation;

    /** Opcional: ID del usuario/admin que realiza la actualización */
    private Long updatedBy;

    /** Opcional: timestamp de actualización enviado por frontend (el backend puede sobrescribir) */
    private LocalDateTime updatedAt;
}