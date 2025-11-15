package com.whalensoft.astrosetupsback.domain.repository;

import com.whalensoft.astrosetupsback.domain.model.ShippingAddress;
import com.whalensoft.astrosetupsback.domain.model.User;
import com.whalensoft.astrosetupsback.domain.model.City;
import java.util.List;
import java.util.Optional;

public interface ShippingAddressRepository {
    ShippingAddress save(ShippingAddress address);
    Optional<ShippingAddress> findById(Long id);
    List<ShippingAddress> findAll();

    List<ShippingAddress> findByUser(User user);
    List<ShippingAddress> findByUserId(Long userId);

    List<ShippingAddress> findByCity(City city);

    void deleteById(Long id);
    void deleteByUser(User user);

    boolean existsById(Long id);
}