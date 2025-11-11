package com.whalensoft.astrosetupsback.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "applied_promo_codes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(AppliedPromoCodeId.class)
public class AppliedPromoCode {
    @Id
    @Column(name = "promo_code")
    private String promoCode;

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Id
    @Column(name = "order_id")
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "promo_code", insertable = false, updatable = false)
    private PromoCode promoCodeRef;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "order_id", insertable = false, updatable = false)
    private Order order;

    @Column(name = "application_date")
    private LocalDateTime applicationDate;
}