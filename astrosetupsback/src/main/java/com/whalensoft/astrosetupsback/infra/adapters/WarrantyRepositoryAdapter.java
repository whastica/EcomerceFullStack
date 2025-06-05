package com.whalensoft.astrosetupsback.infra.adapters;

import com.whalensoft.astrosetupsback.domain.model.Warranty;
import com.whalensoft.astrosetupsback.domain.model.User;
import com.whalensoft.astrosetupsback.domain.model.Product;
import com.whalensoft.astrosetupsback.domain.model.Order;
import com.whalensoft.astrosetupsback.domain.model.WarrantyStatus;
import com.whalensoft.astrosetupsback.domain.repository.WarrantyRepository;
import com.whalensoft.astrosetupsback.infra.repository.JpaWarrantyRepository;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class WarrantyRepositoryAdapter implements WarrantyRepository {

    private final JpaWarrantyRepository jpaWarrantyRepository;

    @Override
    public Warranty save(Warranty warranty) {
        return jpaWarrantyRepository.save(warranty);
    }

    @Override
    public Optional<Warranty> findById(Long id) {
        return jpaWarrantyRepository.findById(id);
    }

    @Override
    public List<Warranty> findByUser(User user) {
        return jpaWarrantyRepository.findByUser(user);
    }

    @Override
    public List<Warranty> findByProduct(Product product) {
        return jpaWarrantyRepository.findByProduct(product);
    }

    @Override
    public List<Warranty> findByOrder(Order order) {
        return jpaWarrantyRepository.findByOrder(order);
    }

    @Override
    public List<Warranty> findByStatus(WarrantyStatus status) {
        return jpaWarrantyRepository.findByStatus(status);
    }

    @Override
    public void deleteById(Long id) {
        jpaWarrantyRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return jpaWarrantyRepository.existsById(id);
    }
}