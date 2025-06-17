package com.whalensoft.astrosetupsback.application.dto.catalog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSummaryDTO {
    private Long id;
    private String name;
    private Double price;
    private Double discountPrice;
    private String brand;
    private String imageUrl;
    private Boolean hasDiscount;
    private Double effectivePrice;
    private String categoryName;
}