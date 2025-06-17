package com.whalensoft.astrosetupsback.infra.adapters;

import com.whalensoft.astrosetupsback.domain.model.ShippingAddress;
import com.whalensoft.astrosetupsback.domain.model.User;
import com.whalensoft.astrosetupsback.domain.repository.ShippingAddressRepository;
import com.whalensoft.astrosetupsback.infra.repository.JpaShippingAddressRepository;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ShippingAddressRepositoryAdapter implements ShippingAddressRepository {

    private final JpaShippingAddressRepository jpaShippingAddressRepository;

    @Override
    public ShippingAddress save(ShippingAddress address) {
        return jpaShippingAddressRepository.save(address);
    }

    @Override
    public Optional<ShippingAddress> findById(Long id) {
        return jpaShippingAddressRepository.findById(id);
    }

    @Override
    public List<ShippingAddress> findAll() {
        return jpaShippingAddressRepository.findAll();
    }

    @Override
    public List<ShippingAddress> findByUser(User user) {
        return jpaShippingAddressRepository.findByUser(user);
    }

    @Override
    public void deleteById(Long id) {
        jpaShippingAddressRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return jpaShippingAddressRepository.existsById(id);
    }
}