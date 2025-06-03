package com.whalensoft.astrosetupsback.infra.repository;

import com.whalensoft.astrosetupsback.domain.model.ShoppingCart;
import com.whalensoft.astrosetupsback.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface JpaShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    Optional<ShoppingCart> findByUser(User user);
    List<ShoppingCart> findByExpirationBefore(LocalDateTime dateTime);
    void deleteByUser(User user);
    boolean existsByUser(User user);
}