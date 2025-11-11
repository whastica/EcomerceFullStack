package com.whalensoft.astrosetupsback.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "applied_promo_codes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppliedPromoCode {

    @EmbeddedId
    private AppliedPromoCodeId id;

    @ManyToOne
    @MapsId("promoCode")
    @JoinColumn(name = "promo_code", nullable = false)
    private PromoCode promoCodeRef;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(name = "application_date")
    private LocalDateTime applicationDate;
}