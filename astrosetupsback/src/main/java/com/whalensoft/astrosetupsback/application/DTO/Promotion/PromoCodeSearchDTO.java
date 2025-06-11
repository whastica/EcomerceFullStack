package com.whalensoft.astrosetupsback.application.DTO.Promotion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromoCodeSearchDTO {
    private String searchTerm; // Buscar por código
    private Boolean active;
    private Boolean expired;
    private Double minDiscount;
    private Double maxDiscount;
    private LocalDateTime createdAfter;
    private LocalDateTime createdBefore;
    private LocalDateTime expiresAfter;
    private LocalDateTime expiresBefore;
    private Boolean forDiscountedProductsOnly;
    private String sortBy; // code, discountPercentage, expirationDate, timesUsed
    private String sortDirection; // ASC, DESC
    private Integer page;
    private Integer size;
}
