package com.whalensoft.astrosetupsback.application.dto.catalog.Product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSummaryDTO {

    private Long id;
    private String name;

    private BigDecimal price;
    private BigDecimal discountPrice;
    private BigDecimal effectivePrice;
    private Boolean hasDiscount;

    private String brand;
    private String imageUrl;
    private Integer stock;

    private String categoryName;
}