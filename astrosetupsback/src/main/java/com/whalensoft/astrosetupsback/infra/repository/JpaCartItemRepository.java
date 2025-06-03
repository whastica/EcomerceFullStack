package com.whalensoft.astrosetupsback.infra.repository;

import com.whalensoft.astrosetupsback.domain.model.CartItem;
import com.whalensoft.astrosetupsback.domain.model.ShoppingCart;
import com.whalensoft.astrosetupsback.domain.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface JpaCartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByShoppingCart(ShoppingCart cart);
    Optional<CartItem> findByShoppingCartAndProduct(ShoppingCart cart, Product product);
    void deleteByShoppingCart(ShoppingCart cart);
    boolean existsByShoppingCartAndProduct(ShoppingCart cart, Product product);
}