package com.whalensoft.astrosetupsback.application.dto.catalog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductStockStatusDTO {
    private Long productId;
    private String productName;
    private Boolean available;
    private String availabilityMessage;
}