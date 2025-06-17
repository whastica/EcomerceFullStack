package com.whalensoft.astrosetupsback.application.dto.catalog;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSearchDTO {
    private String query;
    private Long categoryId;
    private Long categoryTypeId;
    private String brand;
    private Double minPrice;
    private Double maxPrice;
    private Boolean hasDiscount;
    private Boolean hasVariations;
    private String sortBy; // "price", "name", "newest", "discount"
    private String sortDirection; // "asc", "desc"
    private Integer page = 0;
    private Integer size = 20;
}