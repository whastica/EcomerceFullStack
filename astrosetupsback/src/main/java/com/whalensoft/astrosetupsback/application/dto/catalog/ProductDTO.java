package com.whalensoft.astrosetupsback.application.dto.catalog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Double discountPrice;
    private String brand;
    private String imageUrl;
    private Boolean hasVariations;
    private Boolean active;
    private CategorySummaryDTO category;

    // Campos calculados
    private Boolean hasDiscount;
    private Double effectivePrice;
    private Double discountPercentage;
}
