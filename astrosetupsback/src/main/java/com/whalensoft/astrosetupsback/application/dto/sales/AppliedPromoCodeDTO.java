package com.whalensoft.astrosetupsback.application.dto.sales;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppliedPromoCodeDTO {
    private String promoCode;
    private Double discountPercentage;
    private LocalDateTime applicationDate;
    private Double discountAmount;
}