package com.whalensoft.astrosetupsback.infra.adapters;

import com.whalensoft.astrosetupsback.domain.model.CartItem;
import com.whalensoft.astrosetupsback.domain.model.ShoppingCart;
import com.whalensoft.astrosetupsback.domain.model.Product;
import com.whalensoft.astrosetupsback.domain.repository.CartItemRepository;
import com.whalensoft.astrosetupsback.infra.repository.JpaCartItemRepository;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CartItemRepositoryAdapter implements CartItemRepository {

    private final JpaCartItemRepository jpaCartItemRepository;

    @Override
    public CartItem save(CartItem cartItem) {
        return jpaCartItemRepository.save(cartItem);
    }

    @Override
    public Optional<CartItem> findById(Long id) {
        return jpaCartItemRepository.findById(id);
    }

    @Override
    public List<CartItem> findByShoppingCart(ShoppingCart cart) {
        return jpaCartItemRepository.findByShoppingCart(cart);
    }

    @Override
    public Optional<CartItem> findByShoppingCartAndProduct(ShoppingCart cart, Product product) {
        return jpaCartItemRepository.findByShoppingCartAndProduct(cart, product);
    }

    @Override
    public void deleteById(Long id) {
        jpaCartItemRepository.deleteById(id);
    }

    @Override
    public void deleteByShoppingCart(ShoppingCart cart) {
        jpaCartItemRepository.deleteByShoppingCart(cart);
    }

    @Override
    public boolean existsById(Long id) {
        return jpaCartItemRepository.existsById(id);
    }

    @Override
    public boolean existsByShoppingCartAndProduct(ShoppingCart cart, Product product) {
        return jpaCartItemRepository.existsByShoppingCartAndProduct(cart, product);
    }
}