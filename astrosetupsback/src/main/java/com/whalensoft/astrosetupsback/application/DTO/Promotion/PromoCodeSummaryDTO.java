package com.whalensoft.astrosetupsback.application.DTO.Promotion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromoCodeSummaryDTO {
    private String code;
    private Double discountPercentage;
    private LocalDateTime expirationDate;
    private Boolean active;
    private Boolean isValid;
    private Integer timesUsed;
    private Integer remainingUses;
}