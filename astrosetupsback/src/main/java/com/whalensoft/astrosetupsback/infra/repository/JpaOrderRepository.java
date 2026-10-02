package com.whalensoft.astrosetupsback.infra.repository;

import com.whalensoft.astrosetupsback.domain.model.Order;
import com.whalensoft.astrosetupsback.domain.model.User;
import com.whalensoft.astrosetupsback.domain.model.OrderStatus;
import com.whalensoft.astrosetupsback.domain.model.PaymentMethod;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface JpaOrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser(User user);

    Page<Order> findByUser(User user, Pageable pageable);

    List<Order> findByStatus(OrderStatus status);

    List<Order> findByUserAndStatus(User user, OrderStatus status);

    List<Order> findByOrderDateBetween(LocalDateTime startDate, LocalDateTime endDate);

    Long countByStatus(OrderStatus status);

    @Query("SELECT o FROM Order o ORDER BY o.orderDate DESC")
    Page<Order> findAllOrderByOrderDateDesc(Pageable pageable);

    @Query("SELECT o FROM Order o WHERE o.user.id = :userId ORDER BY o.orderDate DESC")
    Page<Order> findByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("""
        SELECT o FROM Order o
        LEFT JOIN FETCH o.user u
        WHERE (:status IS NULL OR o.status = :status)
        AND (:paymentMethod IS NULL OR o.paymentMethod = :paymentMethod)
        AND (:userId IS NULL OR (u IS NOT NULL AND u.id = :userId))
        AND (:orderId IS NULL OR o.id = :orderId)
        AND (:startDate IS NULL OR o.orderDate >= :startDate)
        AND (:endDate IS NULL OR o.orderDate <= :endDate)
        AND (:minTotal IS NULL OR o.total >= :minTotal)
        AND (:maxTotal IS NULL OR o.total <= :maxTotal)
        AND (:customerEmail IS NULL OR LOWER(u.email) LIKE LOWER(CONCAT('%', :customerEmail, '%')))
        AND (:customerName IS NULL OR LOWER(CONCAT(u.firstName, ' ', u.lastName)) LIKE LOWER(CONCAT('%', :customerName, '%')))
        AND (:searchTerm IS NULL
             OR LOWER(u.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%'))
             OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%'))
             OR LOWER(u.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')))
        """)
    Page<Order> searchOrders(
            @Param("status") OrderStatus status,
            @Param("paymentMethod") PaymentMethod paymentMethod,
            @Param("userId") Long userId,
            @Param("orderId") Long orderId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("minTotal") BigDecimal minTotal,
            @Param("maxTotal") BigDecimal maxTotal,
            @Param("customerEmail") String customerEmail,
            @Param("customerName") String customerName,
            @Param("searchTerm") String searchTerm,
            Pageable pageable
    );
}