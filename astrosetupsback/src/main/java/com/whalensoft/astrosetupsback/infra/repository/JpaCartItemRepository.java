package com.whalensoft.astrosetupsback.infra.repository;

import com.whalensoft.astrosetupsback.domain.model.CartItem;
import com.whalensoft.astrosetupsback.domain.model.ShoppingCart;
import com.whalensoft.astrosetupsback.domain.model.Product;
import com.whalensoft.astrosetupsback.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface JpaCartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByShoppingCart(ShoppingCart cart);

    Optional<CartItem> findByShoppingCartAndProduct(ShoppingCart cart, Product product);

    void deleteByShoppingCart(ShoppingCart cart);

    boolean existsByShoppingCartAndProduct(ShoppingCart cart, Product product);


    // --- Métodos añadidos ---
    void deleteByProduct(Product product);

    List<CartItem> findByProduct(Product product);

    List<CartItem> findByUser(User user);

    @Query("SELECT ci FROM CartItem ci WHERE ci.shoppingCart.user.id = :userId AND ci.shoppingCart.active = true")
    List<CartItem> findActiveCartItemsByUser(@Param("userId") Long userId);
}