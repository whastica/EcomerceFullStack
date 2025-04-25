package com.whalensoft.astrosetupsback.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppliedPromoCode {
    @Id
    @ManyToOne
    @JoinColumn(name = "code")
    private PromoCode promoCode;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private LocalDateTime applicationDate;
}
