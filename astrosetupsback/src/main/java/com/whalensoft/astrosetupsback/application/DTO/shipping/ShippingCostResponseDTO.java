package com.whalensoft.astrosetupsback.application.DTO.shipping;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingCostResponseDTO {
    private String destinationCity;
    private String postalCode;
    private Double estimatedCost;
    private Integer estimatedDeliveryDays;
    private String carrierName;
    private List<String> availableServices;
    private Boolean expressAvailable;
    private Double expressCost;
}