package com.whalensoft.astrosetupsback.application.dto.promotion;

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

    private String searchTerm; // Búsqueda por código

    private Boolean active;
    private Boolean expired; // Opcional, pero útil para filtros rápidos

    private PromoDiscountType discountType; // porcentaje, valor fijo o envío gratis

    private Double minDiscountValue; // aplicable solo a % y valor fijo
    private Double maxDiscountValue;

    private Double minMinimumOrderAmount;
    private Double maxMinimumOrderAmount;

    private Boolean appliesToDiscountedProducts;

    private LocalDateTime createdAfter;
    private LocalDateTime createdBefore;

    private LocalDateTime expiresAfter;
    private LocalDateTime expiresBefore;

    private PromoCodeSortBy sortBy;
    private SortDirection sortDirection;

    @Builder.Default
    private Integer page = 0;

    @Builder.Default
    private Integer size = 20;
}