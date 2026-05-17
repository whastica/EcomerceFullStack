package com.whalensoft.astrosetupsback.application.dto.catalog.Product;

import com.whalensoft.astrosetupsback.application.dto.catalog.Category.CategorySummaryDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {

    private Long id;
    private String name;
    private String description;

    private BigDecimal price;
    private BigDecimal discountPrice;
    private BigDecimal effectivePrice;
    private Double discountPercentage;

    private String brand;
    private String imageUrl;
    private Integer stock;

    private Boolean hasVariations;
    private Boolean hasDiscount;

    private CategorySummaryDTO category;
}