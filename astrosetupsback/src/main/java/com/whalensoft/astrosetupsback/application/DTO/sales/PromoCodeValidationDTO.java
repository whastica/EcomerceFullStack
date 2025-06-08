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
public class PromoCodeValidationDTO {
    private String promoCode;
    private Boolean isValid;
    private String validationMessage;
    private Double discountPercentage;
    private Double estimatedDiscount;
}
