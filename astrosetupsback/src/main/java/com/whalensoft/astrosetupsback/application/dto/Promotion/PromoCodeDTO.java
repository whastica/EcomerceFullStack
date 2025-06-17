package com.whalensoft.astrosetupsback.application.dto.Promotion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromoCodeDTO {
    private String code;
    private Double discountPercentage;
    private LocalDateTime expirationDate;
    private Integer remainingUses;
    private Boolean forDiscountedProductsOnly;
    private Boolean active;

    // Campos calculados
    private Boolean isValid;
    private Boolean isExpired;
    private Integer totalUses;
    private Integer timesUsed;
    private LocalDateTime createdAt;
}
