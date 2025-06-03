package com.whalensoft.astrosetupsback.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppliedPromoCodeId implements Serializable {
    private String promoCode;
    private Long userId;
    private Long orderId;
}