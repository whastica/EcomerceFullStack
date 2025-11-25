package com.whalensoft.astrosetupsback.application.interfaces;

import com.whalensoft.astrosetupsback.application.dto.common.PageResponseDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.AddToCartDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.CartSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.UpdateCartItemDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.checkout.CheckoutSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.checkout.ProcessCheckoutDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.orders.*;
import com.whalensoft.astrosetupsback.application.dto.sales.search.OrderSearchDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.search.OrderSearchResultDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.search.SalesStatsDTO;

import java.util.List;

public interface SalesService {
    // Gestión de Pedidos
    OrderDTO createOrder(CreateOrderDTO createOrderDTO);
    OrderDTO getOrderById(Long id);
    PageResponseDTO<OrderSearchResultDTO> searchOrders(OrderSearchDTO searchDTO);
    OrderDTO updateOrderStatus(Long id, UpdateOrderStatusDTO updateStatusDTO);
    List<OrderStatusHistoryDTO> getOrderStatusHistory(Long id);
    OrderTrackingDTO getOrderTracking(Long id);
    List<OrderSummaryDTO> getCustomerOrders(Long customerId);
    
    // Gestión del Carrito
    ShoppingCartDTO getShoppingCart(Long userId);
    CartItemDTO addToCart(AddToCartDTO addToCartDTO);
    CartItemDTO updateCartItem(Long cartItemId, UpdateCartItemDTO updateCartItemDTO);
    void removeFromCart(Long cartItemId);
    CartSummaryDTO getCartSummary(Long userId);
    
    // Proceso de Checkout
    CheckoutSummaryDTO processCheckout(ProcessCheckoutDTO checkoutDTO);
    PromoCodeValidationDTO validatePromoCode(String code);
    AppliedPromoCodeDTO applyPromoCode(ApplyPromoCodeDTO applyPromoCodeDTO);
    
    // Estadísticas de Ventas
    SalesStatsDTO getSalesStats();
} 