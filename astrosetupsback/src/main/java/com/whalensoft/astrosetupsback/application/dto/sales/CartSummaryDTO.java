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
public class CartSummaryDTO {
    private Long id;
    private Double total;
    private Integer totalItems;
    private Boolean isExpired;
    private LocalDateTime expiration;
}
