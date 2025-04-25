package com.whalensoft.astrosetupsback.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromoCode {
    @Id
    private String code;
    private Double discountPercentage;
    private LocalDateTime expirationDate;
    private Integer remainingUses;
    private Boolean forDiscountedProductsOnly;
    private Boolean active;

    @OneToMany(mappedBy = "promoCode")
    private List<AppliedPromoCode> appliedPromoCodes;
}