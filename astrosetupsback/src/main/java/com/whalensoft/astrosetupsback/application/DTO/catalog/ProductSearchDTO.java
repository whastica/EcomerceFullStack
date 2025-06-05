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