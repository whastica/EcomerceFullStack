package com.whalensoft.astrosetupsback.application.dto.promotion.code;

import com.whalensoft.astrosetupsback.application.dto.promotion.enums.PromoDiscountType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromoCodeUsageRankingDTO {
    private String code;
    private PromoDiscountType type;
    private Double discountValue;
    private Integer timesUsed;
}