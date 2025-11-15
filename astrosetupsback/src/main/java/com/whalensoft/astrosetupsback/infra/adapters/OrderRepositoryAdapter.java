package com.whalensoft.astrosetupsback.infra.adapters;

import com.whalensoft.astrosetupsback.domain.model.Order;
import com.whalensoft.astrosetupsback.domain.model.User;
import com.whalensoft.astrosetupsback.domain.model.OrderStatus;
import com.whalensoft.astrosetupsback.domain.repository.OrderRepository;
import com.whalensoft.astrosetupsback.infra.repository.JpaOrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OrderRepositoryAdapter implements OrderRepository {

    private final JpaOrderRepository jpaOrderRepository;

    @Override
    public Order save(Order order) {
        return jpaOrderRepository.save(order);
    }

    @Override
    public Optional<Order> findById(Long id) {
        return jpaOrderRepository.findById(id);
    }

    @Override
    public List<Order> findByUser(User user) {
        return jpaOrderRepository.findByUser(user);
    }

    @Override
    public Page<Order> findByUser(User user, Pageable pageable) {
        return jpaOrderRepository.findByUser(user, pageable);
    }

    @Override
    public List<Order> findByStatus(OrderStatus status) {
        return jpaOrderRepository.findByStatus(status);
    }

    @Override
    public List<Order> findByUserAndStatus(User user, OrderStatus status) {
        return jpaOrderRepository.findByUserAndStatus(user, status);
    }

    @Override
    public List<Order> findByOrderDateBetween(LocalDateTime startDate, LocalDateTime endDate) {
        return jpaOrderRepository.findByOrderDateBetween(startDate, endDate);
    }

    @Override
    public Long countByStatus(OrderStatus status) {
        return jpaOrderRepository.countByStatus(status);
    }

    @Override
    public boolean existsById(Long id) {
        return jpaOrderRepository.existsById(id);
    }

    @Override
    public void deleteById(Long id) {
        jpaOrderRepository.deleteById(id);
    }

    @Override
    public Page<Order> findLatestOrders(Pageable pageable) {
        return jpaOrderRepository.findAllOrderByOrderDateDesc(pageable);
    }

    @Override
    public Page<Order> findByUserId(Long userId, Pageable pageable) {
        return jpaOrderRepository.findByUserId(userId, pageable);
    }
}