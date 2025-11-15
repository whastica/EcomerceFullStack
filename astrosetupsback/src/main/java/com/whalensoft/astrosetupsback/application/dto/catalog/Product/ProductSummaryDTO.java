package com.whalensoft.astrosetupsback.application.dto.catalog.Product;

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
    private Double effectivePrice;
    private Boolean hasDiscount;

    private String brand;
    private String imageUrl;

    private String categoryName;
}