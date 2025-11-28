package com.whalensoft.astrosetupsback.application.dto.shipping;

import jakarta.validation.constraints.DecimalMin;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingCostResponseDTO {

    private CitySummaryDTO destinationCity;

    private PostalCodeSummaryDTO postalCode;

    @DecimalMin(value = "0.0", message = "El costo estimado no puede ser negativo")
    private BigDecimal estimatedCost;

    private Integer estimatedDeliveryDays;

    private String carrierName;

    private List<String> availableServices;

    private Boolean expressAvailable;

    @DecimalMin(value = "0.0", message = "El costo express no puede ser negativo")
    private BigDecimal expressCost;
}