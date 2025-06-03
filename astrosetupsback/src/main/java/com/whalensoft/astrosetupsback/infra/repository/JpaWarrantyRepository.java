package com.whalensoft.astrosetupsback.infra.repository;

import com.whalensoft.astrosetupsback.domain.model.Warranty;
import com.whalensoft.astrosetupsback.domain.model.User;
import com.whalensoft.astrosetupsback.domain.model.Product;
import com.whalensoft.astrosetupsback.domain.model.Order;
import com.whalensoft.astrosetupsback.domain.model.WarrantyStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JpaWarrantyRepository extends JpaRepository<Warranty, Long> {
    List<Warranty> findByUser(User user);
    List<Warranty> findByProduct(Product product);
    List<Warranty> findByOrder(Order order);
    List<Warranty> findByStatus(WarrantyStatus status);
}