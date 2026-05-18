package com.whalensoft.astrosetupsback.application.dto.catalog.Product;

import com.whalensoft.astrosetupsback.application.dto.catalog.Category.CategorySummaryDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDetailDTO {

    private Long id;
    private String name;
    private String description;

    private BigDecimal price;
    private BigDecimal discountPrice;
    private BigDecimal effectivePrice;
    private Double discountPercentage;
    private Boolean hasDiscount;

    private String brand;
    private Integer stock;

    private String mainImageUrl;

    @Builder.Default
    private List<String> galleryImages = new ArrayList<>();

    private Boolean hasVariations;

    private CategorySummaryDTO category;
}