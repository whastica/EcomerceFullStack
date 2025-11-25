package com.whalensoft.astrosetupsback.application.dto.sales.orders;


import com.whalensoft.astrosetupsback.application.dto.customer.Users.GuestUserDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.search.OrderItemDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.checkout.ShippingAddressDTO;
import com.whalensoft.astrosetupsback.domain.model.OrderStatus;
import com.whalensoft.astrosetupsback.domain.model.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {

    private Long id;

    /** Totales y costos */
    private BigDecimal subtotal;
    private BigDecimal totalDiscount;
    private BigDecimal shippingCost;
    private BigDecimal total;

    private LocalDateTime orderDate;
    private OrderStatus status;
    private PaymentMethod paymentMethod;

    /** Información del usuario */
    private Long userId;
    private String userFullName;
    private String userEmail;

    /** Información de guest user (opcional) */
    private GuestUserDTO guestUser;

    /** Items de la orden */
    private List<OrderItemResponseDTO> orderItems;

    /** Resumen calculado */
    private Integer totalItems;
}