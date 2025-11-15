package com.whalensoft.astrosetupsback.application.dto.catalog.Product;

import com.whalensoft.astrosetupsback.application.dto.catalog.Category.CategorySummaryDTO;
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
    private Double effectivePrice;
    private Double discountPercentage;

    private String brand;
    private String imageUrl;

    private Boolean hasVariations;
    private Boolean hasDiscount;

    private CategorySummaryDTO category;
}