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
public class UserPromoCodeHistoryDTO {
    private String promoCode;
    private Double discountPercentage;
    private Double discountAmount;
    private LocalDateTime applicationDate;
    private Long orderId;
    private String orderStatus;
    private Double orderTotal;
}
