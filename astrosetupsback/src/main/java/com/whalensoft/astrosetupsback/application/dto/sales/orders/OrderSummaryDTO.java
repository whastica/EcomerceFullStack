package com.whalensoft.astrosetupsback.application.dto.sales.orders;

import com.whalensoft.astrosetupsback.domain.model.OrderStatus;
import com.whalensoft.astrosetupsback.domain.model.PaymentMethod;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderSummaryDTO {

    /** ID único de la orden */
    @NotNull(message = "El ID de la orden es obligatorio")
    private Long id;

    /** Total final de la orden */
    @NotNull(message = "El total de la orden es obligatorio")
    private BigDecimal total;

    /** Fecha y hora de creación de la orden */
    @NotNull(message = "La fecha de la orden es obligatoria")
    private LocalDateTime orderDate;

    /** Estado actual de la orden */
    @NotNull(message = "El estado de la orden es obligatorio")
    private OrderStatus status;

    /** Método de pago utilizado */
    @NotNull(message = "El método de pago es obligatorio")
    private PaymentMethod paymentMethod;

    /** Nombre completo del usuario que realizó la orden */
    @NotBlank(message = "El nombre del usuario es obligatorio")
    private String userFullName;

    /** Total de ítems en la orden */
    @NotNull(message = "El total de ítems es obligatorio")
    private Integer totalItems;

    /** Nombre del primer producto para mostrar en listados resumidos */
    @NotBlank(message = "El nombre del primer producto es obligatorio")
    private String firstProductName;

    /** Opcional: descripción resumida de la orden, ej: "Producto X y 2 más" */
    private String summaryDescription;
}