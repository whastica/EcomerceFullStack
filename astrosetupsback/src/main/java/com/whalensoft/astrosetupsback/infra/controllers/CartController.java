package com.whalensoft.astrosetupsback.infra.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.whalensoft.astrosetupsback.application.common.ErrorMessages;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.AddToCartDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.CartItemDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.CartSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.MigrateCartDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.ShoppingCartDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.UpdateCartItemDTO;
import com.whalensoft.astrosetupsback.application.interfaces.SalesService;
import com.whalensoft.astrosetupsback.infra.exceptions.AccessDeniedException;
import com.whalensoft.astrosetupsback.infra.security.SecurityUtils;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    private final SalesService salesService;

    public CartController(SalesService salesService) {
        this.salesService = salesService;
    }

    // Obtener el carrito actual del usuario (solo dueño o admin)
    @GetMapping("/{userId}")
    public ResponseEntity<ShoppingCartDTO> getCart(@PathVariable Long userId) {
        checkOwnership(userId);
        ShoppingCartDTO cart = salesService.getShoppingCart(userId);
        return ResponseEntity.ok(cart);
    }

    // Obtener carrito de guest por guestCartId (publico: el id es opaco)
    @GetMapping("/guest/{guestCartId}")
    public ResponseEntity<ShoppingCartDTO> getGuestCart(@PathVariable String guestCartId) {
        ShoppingCartDTO cart = salesService.getGuestCart(guestCartId);
        return ResponseEntity.ok(cart);
    }

    // Migrar carrito guest al usuario autenticado (solo el propio usuario o admin)
    @PostMapping("/migrate")
    public ResponseEntity<ShoppingCartDTO> migrateGuestCart(@Valid @RequestBody MigrateCartDTO migrateCartDTO) {
        checkOwnership(migrateCartDTO.getUserId());
        ShoppingCartDTO cart = salesService.migrateGuestCart(migrateCartDTO);
        return ResponseEntity.ok(cart);
    }

    // Agregar un producto al carrito.
    // Publico para invitados (guestCartId); si se reclama un userId debe ser
    // el del usuario autenticado (o admin) - evita escribir en carritos ajenos.
    @PostMapping("/items")
    public ResponseEntity<CartItemDTO> addToCart(@Valid @RequestBody AddToCartDTO addToCartDTO) {
        if (addToCartDTO.getUserId() != null) {
            checkOwnership(addToCartDTO.getUserId());
        }
        CartItemDTO item = salesService.addToCart(addToCartDTO);
        return ResponseEntity.ok(item);
    }

    // Actualizar la cantidad de un ítem (dueño del carrito, guest o admin)
    @PatchMapping("/items/{itemId}")
    public ResponseEntity<CartItemDTO> updateCartItem(
            @PathVariable Long itemId,
            @Valid @RequestBody UpdateCartItemDTO updateCartItemDTO
    ) {
        checkItemOwnership(itemId);
        CartItemDTO item = salesService.updateCartItem(itemId, updateCartItemDTO);
        return ResponseEntity.ok(item);
    }

    // Eliminar un ítem del carrito (dueño del carrito, guest o admin)
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long itemId) {
        checkItemOwnership(itemId);
        salesService.removeFromCart(itemId);
        return ResponseEntity.noContent().build();
    }

    // Obtener resumen del carrito (solo dueño o admin)
    @GetMapping("/{userId}/summary")
    public ResponseEntity<CartSummaryDTO> getCartSummary(@PathVariable Long userId) {
        checkOwnership(userId);
        CartSummaryDTO summary = salesService.getCartSummary(userId);
        return ResponseEntity.ok(summary);
    }

    private void checkOwnership(Long resourceUserId) {
        if (!SecurityUtils.isAdmin() && !resourceUserId.equals(SecurityUtils.getCurrentUserId())) {
            throw new AccessDeniedException(ErrorMessages.FORBIDDEN);
        }
    }

    private void checkItemOwnership(Long cartItemId) {
        Long ownerUserId = salesService.getCartItemOwnerUserId(cartItemId);
        // ownerUserId == null -> carrito guest (identidad opaca por guestCartId)
        if (ownerUserId != null) {
            checkOwnership(ownerUserId);
        }
    }
}
