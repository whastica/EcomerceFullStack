package com.whalensoft.astrosetupsback.application.DTO.sales;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CheckoutSummaryDTO {
    private List<CartItemDTO> items;
    private Double subtotal;
    private List<AppliedPromoCodeDTO> appliedPromoCodes;
    private Double totalDiscount;
    private Double shippingCost;
    private Double total;
    private Integer totalItems;
}
