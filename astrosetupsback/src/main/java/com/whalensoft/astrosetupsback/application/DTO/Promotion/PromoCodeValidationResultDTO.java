package com.whalensoft.astrosetupsback.application.DTO.Promotion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromoCodeValidationResultDTO {
    private Boolean isValid;
    private String message;
    private String promoCode;
    private Double discountPercentage;
    private Double estimatedDiscount;
    private Boolean canBeApplied;
    private String validationError;
}

