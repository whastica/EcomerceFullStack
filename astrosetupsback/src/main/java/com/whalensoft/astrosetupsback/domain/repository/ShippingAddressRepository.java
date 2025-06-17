package com.whalensoft.astrosetupsback.domain.repository;

import com.whalensoft.astrosetupsback.domain.model.ShippingAddress;
import com.whalensoft.astrosetupsback.domain.model.User;
import java.util.List;
import java.util.Optional;

public interface ShippingAddressRepository {
    ShippingAddress save(ShippingAddress address);
    Optional<ShippingAddress> findById(Long id);
    List<ShippingAddress> findAll();
    List<ShippingAddress> findByUser(User user);
    void deleteById(Long id);
    boolean existsById(Long id);
}