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

    void deleteByProduct(Product product);

    List<CartItem> findByProduct(Product product);

    // Reemplaza findByUser — CartItem no tiene user directo
    @Query("SELECT ci FROM CartItem ci WHERE ci.shoppingCart.user.id = :userId")
    List<CartItem> findByUserId(@Param("userId") Long userId);

    // Reemplaza findActiveCartItemsByUser — ShoppingCart no tiene campo active
    @Query("SELECT ci FROM CartItem ci WHERE ci.shoppingCart.user.id = :userId AND ci.shoppingCart.expiration > CURRENT_TIMESTAMP")
    List<CartItem> findActiveCartItemsByUser(@Param("userId") Long userId);
}