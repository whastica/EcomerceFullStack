package com.whalensoft.astrosetupsback.domain.repository;

import com.whalensoft.astrosetupsback.domain.model.Order;
import com.whalensoft.astrosetupsback.domain.model.User;
import com.whalensoft.astrosetupsback.domain.model.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository {

    Order save(Order order);

    Optional<Order> findById(Long id);

    List<Order> findByUser(User user);

    Page<Order> findByUser(User user, Pageable pageable);

    List<Order> findByStatus(OrderStatus status);

    List<Order> findByUserAndStatus(User user, OrderStatus status);

    List<Order> findByOrderDateBetween(LocalDateTime startDate, LocalDateTime endDate);

    Long countByStatus(OrderStatus status);

    boolean existsById(Long id);

    void deleteById(Long id);

    // --- Métodos recomendados ---
    Page<Order> findLatestOrders(Pageable pageable);

    Page<Order> findByUserId(Long userId, Pageable pageable);
}