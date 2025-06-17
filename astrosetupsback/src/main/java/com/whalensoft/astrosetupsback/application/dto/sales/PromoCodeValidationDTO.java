package com.whalensoft.astrosetupsback.application.dto.sales;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
