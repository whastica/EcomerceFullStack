package com.whalensoft.astrosetupsback.application.dto.promotion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromoCodeApplicationResultDTO {
    private Boolean success;
    private String message;
    private String promoCode;
    private Double discountPercentage;
    private Double discountAmount;
    private Double originalAmount;
    private Double finalAmount;
    private Integer remainingUses;
}