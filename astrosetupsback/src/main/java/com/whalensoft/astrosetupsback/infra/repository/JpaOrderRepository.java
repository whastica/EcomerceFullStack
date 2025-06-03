package com.whalensoft.astrosetupsback.infra.repository;

import com.whalensoft.astrosetupsback.domain.model.Order;
import com.whalensoft.astrosetupsback.domain.model.User;
import com.whalensoft.astrosetupsback.domain.model.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface JpaOrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    List<Order> findByStatus(OrderStatus status);
    Page<Order> findByUser(User user, Pageable pageable);
    List<Order> findByOrderDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<Order> findByUserAndStatus(User user, OrderStatus status);
    Long countByStatus(OrderStatus status);

    @Query("SELECT o FROM Order o ORDER BY o.orderDate DESC")
    Page<Order> findAllOrderByOrderDateDesc(Pageable pageable);
}