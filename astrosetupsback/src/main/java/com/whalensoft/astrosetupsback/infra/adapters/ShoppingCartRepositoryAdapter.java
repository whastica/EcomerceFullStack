package com.whalensoft.astrosetupsback.infra.adapters;

import com.whalensoft.astrosetupsback.domain.model.ShoppingCart;
import com.whalensoft.astrosetupsback.domain.model.User;
import com.whalensoft.astrosetupsback.domain.repository.ShoppingCartRepository;
import com.whalensoft.astrosetupsback.infra.repository.JpaShoppingCartRepository;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ShoppingCartRepositoryAdapter implements ShoppingCartRepository {

    private final JpaShoppingCartRepository jpaShoppingCartRepository;

    @Override
    public ShoppingCart save(ShoppingCart cart) {
        return jpaShoppingCartRepository.save(cart);
    }

    @Override
    public Optional<ShoppingCart> findById(Long id) {
        return jpaShoppingCartRepository.findById(id);
    }

    @Override
    public Optional<ShoppingCart> findByUser(User user) {
        return jpaShoppingCartRepository.findByUser(user);
    }

    @Override
    public List<ShoppingCart> findByExpirationBefore(LocalDateTime dateTime) {
        return jpaShoppingCartRepository.findByExpirationBefore(dateTime);
    }

    @Override
    public void deleteById(Long id) {
        jpaShoppingCartRepository.deleteById(id);
    }

    @Override
    public void deleteByUser(User user) {
        jpaShoppingCartRepository.deleteByUser(user);
    }

    @Override
    public boolean existsByUser(User user) {
        return jpaShoppingCartRepository.existsByUser(user);
    }
}
