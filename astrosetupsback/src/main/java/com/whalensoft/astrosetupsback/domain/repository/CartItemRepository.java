package com.whalensoft.astrosetupsback.domain.repository;

import com.whalensoft.astrosetupsback.domain.model.CartItem;
import com.whalensoft.astrosetupsback.domain.model.ShoppingCart;
import com.whalensoft.astrosetupsback.domain.model.Product;
import com.whalensoft.astrosetupsback.domain.model.User;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository {

    CartItem save(CartItem cartItem);
    Optional<CartItem> findById(Long id);
    List<CartItem> findByShoppingCart(ShoppingCart cart);
    Optional<CartItem> findByShoppingCartAndProduct(ShoppingCart cart, Product product);
    void deleteById(Long id);
    void deleteByShoppingCart(ShoppingCart cart);
    boolean existsById(Long id);
    boolean existsByShoppingCartAndProduct(ShoppingCart cart, Product product);
    // --- Métodos opcionales añadidos ---
    void deleteByProduct(Product product);
    List<CartItem> findByProduct(Product product);
    List<CartItem> findByUser(User user);
    List<CartItem> findActiveCartItemsByUser(Long userId);
}