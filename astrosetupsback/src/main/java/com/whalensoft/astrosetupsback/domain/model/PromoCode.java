package com.whalensoft.astrosetupsback.domain.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
    @Builder.Default
    private Boolean forDiscountedProductsOnly = false;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    @OneToMany(mappedBy = "promoCodeEntity", fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Builder.Default
    private List<AppliedPromoCode> appliedPromoCodes = new ArrayList<>();

    // Método para verificar si el código es válido
    public Boolean isValid() {
        return active &&
                (expirationDate == null || expirationDate.isAfter(LocalDateTime.now())) &&
                (remainingUses == null || remainingUses > 0);
    }
}