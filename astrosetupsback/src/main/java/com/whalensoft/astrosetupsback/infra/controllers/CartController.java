package com.whalensoft.astrosetupsback.infra.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.whalensoft.astrosetupsback.application.dto.sales.cart.AddToCartDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.CartItemDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.CartSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.ShoppingCartDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.UpdateCartItemDTO;
import com.whalensoft.astrosetupsback.application.interfaces.SalesService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    private final SalesService salesService;

    public CartController(SalesService salesService) {
        this.salesService = salesService;
    }

    // Obtener el carrito actual del usuario
    @GetMapping("/{userId}")
    public ResponseEntity<ShoppingCartDTO> getCart(@PathVariable Long userId) {
        ShoppingCartDTO cart = salesService.getShoppingCart(userId);
        return ResponseEntity.ok(cart);
    }

    // Agregar un producto al carrito
    @PostMapping("/items")
    public ResponseEntity<CartItemDTO> addToCart(@Valid @RequestBody AddToCartDTO addToCartDTO) {
        CartItemDTO item = salesService.addToCart(addToCartDTO);
        return ResponseEntity.ok(item);
    }

    // Actualizar la cantidad de un ítem del carrito
    @PatchMapping("/items/{itemId}")
    public ResponseEntity<CartItemDTO> updateCartItem(
            @PathVariable Long itemId,
            @Valid @RequestBody UpdateCartItemDTO updateCartItemDTO
    ) {
        CartItemDTO item = salesService.updateCartItem(itemId, updateCartItemDTO);
        return ResponseEntity.ok(item);
    }

    // Eliminar un ítem del carrito
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long itemId) {
        salesService.removeFromCart(itemId);
        return ResponseEntity.noContent().build();
    }

    // Obtener resumen del carrito
    @GetMapping("/{userId}/summary")
    public ResponseEntity<CartSummaryDTO> getCartSummary(@PathVariable Long userId) {
        CartSummaryDTO summary = salesService.getCartSummary(userId);
        return ResponseEntity.ok(summary);
    }
} 