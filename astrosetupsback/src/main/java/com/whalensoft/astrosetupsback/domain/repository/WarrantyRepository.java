package com.whalensoft.astrosetupsback.domain.repository;

import com.whalensoft.astrosetupsback.domain.model.Warranty;
import com.whalensoft.astrosetupsback.domain.model.User;
import com.whalensoft.astrosetupsback.domain.model.Product;
import com.whalensoft.astrosetupsback.domain.model.Order;
import com.whalensoft.astrosetupsback.domain.model.WarrantyStatus;
import java.util.List;
import java.util.Optional;

public interface WarrantyRepository {
    Warranty save(Warranty warranty);
    Optional<Warranty> findById(Long id);
    List<Warranty> findByUser(User user);
    List<Warranty> findByProduct(Product product);
    List<Warranty> findByOrder(Order order);
    List<Warranty> findByStatus(WarrantyStatus status);
    void deleteById(Long id);
    boolean existsById(Long id);
}