package com.whalensoft.astrosetupsback.application.dto.promotion.code;

import com.whalensoft.astrosetupsback.application.dto.promotion.enums.PromoDiscountType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromoCodeDTO {

    private String code;

    private PromoDiscountType discountType;  // porcentaje, valor fijo, free_shipping

    private Double discountValue; // % o valor fijo. Si free_shipping = 0.

    private LocalDateTime expirationDate;

    private Boolean active;

    private Integer remainingUses;

    private Integer maxUses; // Opcional pero recomendado

    private Double minimumOrderAmount; // Si aplica (puede ser null)

    private Boolean appliesToDiscountedProducts;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}