package com.whalensoft.astrosetupsback.infra.controllers;

import java.util.List;

import com.whalensoft.astrosetupsback.application.common.ErrorMessages;
import com.whalensoft.astrosetupsback.infra.exceptions.AccessDeniedException;
import com.whalensoft.astrosetupsback.infra.security.SecurityUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whalensoft.astrosetupsback.application.dto.common.PageResponseDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.checkout.CheckoutSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.orders.CreateOrderDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.orders.OrderDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.search.OrderSearchDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.search.OrderSearchResultDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.orders.OrderStatusHistoryDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.orders.OrderSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.orders.OrderTrackingDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.checkout.ProcessCheckoutDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.search.SalesStatsDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.orders.UpdateOrderStatusDTO;
import com.whalensoft.astrosetupsback.application.interfaces.SalesService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/sales")
public class SalesController {
    private final SalesService salesService;

    public SalesController(SalesService salesService) {
        this.salesService = salesService;
    }

    // --- Pedidos ---
    @PostMapping("/orders")
    public ResponseEntity<OrderDTO> createOrder(@Valid @RequestBody CreateOrderDTO dto) {
        return ResponseEntity.ok(salesService.createOrder(dto));
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
        checkOrderOwnership(id);
        return ResponseEntity.ok(salesService.getOrderById(id));
    }

    @PostMapping("/orders/search")
    public ResponseEntity<PageResponseDTO<OrderSearchResultDTO>> searchOrders(@RequestBody OrderSearchDTO searchDTO) {
        return ResponseEntity.ok(salesService.searchOrders(searchDTO));
    }

    @PutMapping("/orders/{id}/status")
    public ResponseEntity<OrderDTO> updateOrderStatus(@PathVariable Long id, @Valid @RequestBody UpdateOrderStatusDTO dto) {
        return ResponseEntity.ok(salesService.updateOrderStatus(id, dto));
    }

    @GetMapping("/orders/{id}/status-history")
    public ResponseEntity<List<OrderStatusHistoryDTO>> getOrderStatusHistory(@PathVariable Long id) {
        checkOrderOwnership(id);
        return ResponseEntity.ok(salesService.getOrderStatusHistory(id));
    }

    @GetMapping("/orders/{id}/tracking")
    public ResponseEntity<OrderTrackingDTO> getOrderTracking(@PathVariable Long id) {
        checkOrderOwnership(id);
        return ResponseEntity.ok(salesService.getOrderTracking(id));
    }

    @GetMapping("/orders/customer/{customerId}")
    public ResponseEntity<List<OrderSummaryDTO>> getCustomerOrders(@PathVariable Long customerId) {
        checkOwnership(customerId);
        return ResponseEntity.ok(salesService.getCustomerOrders(customerId));
    }

    // --- Checkout ---
    @PostMapping("/checkout")
    public ResponseEntity<CheckoutSummaryDTO> processCheckout(@Valid @RequestBody ProcessCheckoutDTO dto) {
        return ResponseEntity.ok(salesService.processCheckout(dto));
    }

    // --- Estadísticas de Ventas ---
    @GetMapping("/stats")
    public ResponseEntity<SalesStatsDTO> getSalesStats() {
        return ResponseEntity.ok(salesService.getSalesStats());
    }

    private void checkOrderOwnership(Long orderId) {
        if (!SecurityUtils.isAdmin()) {
            Long orderUserId = salesService.getOrderUserId(orderId);
            if (!orderUserId.equals(SecurityUtils.getCurrentUserId())) {
                throw new AccessDeniedException(ErrorMessages.FORBIDDEN);
            }
        }
    }

    private void checkOwnership(Long resourceUserId) {
        if (!SecurityUtils.isAdmin() && !resourceUserId.equals(SecurityUtils.getCurrentUserId())) {
            throw new AccessDeniedException(ErrorMessages.FORBIDDEN);
        }
    }
}
