package com.whalensoft.astrosetupsback.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "promo_codes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "appliedPromoCodes")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PromoCode {

    @Id
    @Column(length = 50)
    @EqualsAndHashCode.Include
    @NotBlank
    private String code;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @DecimalMax(value = "100.0", inclusive = true)
    @Column(name = "discount_percentage", nullable = false)
    private Double discountPercentage;

    @Column(name = "expiration_date")
    private LocalDateTime expirationDate;

    @Min(0)
    @Column(name = "remaining_uses")
    private Integer remainingUses;

    @NotNull
    @Builder.Default
    @Column(name = "for_discounted_products_only", nullable = false)
    private Boolean forDiscountedProductsOnly = false;

    @NotNull
    @Builder.Default
    @Column(nullable = false)
    private Boolean active = true;

    @OneToMany(mappedBy = "promoCodeRef", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<AppliedPromoCode> appliedPromoCodes = new ArrayList<>();

    public boolean isValid() {
        return Boolean.TRUE.equals(active)
                && (expirationDate == null || expirationDate.isAfter(LocalDateTime.now()))
                && (remainingUses == null || remainingUses > 0);
    }
}