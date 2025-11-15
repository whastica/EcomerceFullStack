package com.whalensoft.astrosetupsback.domain.repository;

import com.whalensoft.astrosetupsback.domain.model.ShoppingCart;
import com.whalensoft.astrosetupsback.domain.model.User;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ShoppingCartRepository {

    ShoppingCart save(ShoppingCart cart);

    Optional<ShoppingCart> findById(Long id);

    Optional<ShoppingCart> findByUser(User user);
    Optional<ShoppingCart> findByUserId(Long userId);

    List<ShoppingCart> findByExpirationBefore(LocalDateTime dateTime);

    void deleteById(Long id);
    void deleteByUser(User user);
    void deleteByUserId(Long userId);

    boolean existsByUser(User user);
    boolean existsByUserId(Long userId);
}