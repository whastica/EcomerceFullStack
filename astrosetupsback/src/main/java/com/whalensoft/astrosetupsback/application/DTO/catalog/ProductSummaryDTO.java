package com.whalensoft.astrosetupsback.application.DTO.catalog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;
import java.util.List;

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