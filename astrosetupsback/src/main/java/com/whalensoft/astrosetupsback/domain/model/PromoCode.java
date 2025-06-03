package com.whalensoft.astrosetupsback.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "promo_codes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromoCode {
    @Id
    @Column(name = "code", length = 50)
    private String code;

    @Column(name = "discount_percentage", nullable = false)
    private Double discountPercentage;

    @Column(name = "expiration_date")
    private LocalDateTime expirationDate;

    @Column(name = "remaining_uses")
    private Integer remainingUses;

    @Column(name = "for_discounted_products_only")
    private Boolean forDiscountedProductsOnly = false;

    @Column(nullable = false)
    private Boolean active = true;

    @OneToMany(mappedBy = "promoCodeEntity", fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<AppliedPromoCode> appliedPromoCodes = new ArrayList<>();

    // Método para verificar si el código es válido
    public Boolean isValid() {
        return active &&
                (expirationDate == null || expirationDate.isAfter(LocalDateTime.now())) &&
                (remainingUses == null || remainingUses > 0);
    }
}