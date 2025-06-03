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
    List<Order> findByStatus(OrderStatus status);
    Page<Order> findByUser(User user, Pageable pageable);
    Page<Order> findAll(Pageable pageable);
    List<Order> findByOrderDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<Order> findByUserAndStatus(User user, OrderStatus status);
    void deleteById(Long id);
    boolean existsById(Long id);
    Long countByStatus(OrderStatus status);
}