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
public class AppliedPromoCodeDTO {
    private String promoCode;
    private Double discountPercentage;
    private LocalDateTime applicationDate;
    private Double discountAmount;
}