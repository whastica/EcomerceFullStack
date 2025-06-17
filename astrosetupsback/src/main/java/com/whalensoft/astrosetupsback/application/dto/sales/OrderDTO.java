package com.whalensoft.astrosetupsback.application.dto.sales;


import com.whalensoft.astrosetupsback.domain.model.OrderStatus;
import com.whalensoft.astrosetupsback.domain.model.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {
    private Long id;
    private Double total;
    private LocalDateTime orderDate;
    private OrderStatus status;
    private PaymentMethod paymentMethod;

    // Información del usuario (solo lo necesario)
    private Long userId;
    private String userFullName;
    private String userEmail;

    // Dirección de envío
    private ShippingAddressDTO shippingAddress;

    // Items de la orden
    private List<OrderItemDTO> orderItems;

    // Códigos promocionales aplicados
    private List<AppliedPromoCodeDTO> appliedPromoCodes;

    // Campos calculados
    private Double subtotal;
    private Double totalDiscount;
    private Integer totalItems;
}