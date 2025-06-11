package com.whalensoft.astrosetupsback.application.DTO.Promotion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromoCodeStatsDTO {
    private Long totalPromoCodes;
    private Long activePromoCodes;
    private Long expiredPromoCodes;
    private Long usedPromoCodes;
    private Long totalApplications;
    private Double totalDiscountGiven;
    private Double averageDiscountPercentage;
    private Map<String, Integer> topUsedCodes;
    private LocalDateTime lastCodeCreated;
}
