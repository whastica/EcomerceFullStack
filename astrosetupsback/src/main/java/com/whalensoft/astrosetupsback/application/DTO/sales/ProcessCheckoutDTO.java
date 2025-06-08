package com.whalensoft.astrosetupsback.application.DTO.sales;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProcessCheckoutDTO {
    @NotNull(message = "El resumen de checkout es obligatorio")
    private CheckoutSummaryDTO checkoutSummary;

    @NotNull(message = "Los datos de la orden son obligatorios")
    private CreateOrderDTO orderData;
}
