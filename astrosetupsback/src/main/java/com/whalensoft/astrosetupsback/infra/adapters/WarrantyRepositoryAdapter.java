package com.whalensoft.astrosetupsback.infra.adapters;

import com.whalensoft.astrosetupsback.domain.model.Warranty;
import com.whalensoft.astrosetupsback.domain.model.User;
import com.whalensoft.astrosetupsback.domain.model.Product;
import com.whalensoft.astrosetupsback.domain.model.Order;
import com.whalensoft.astrosetupsback.domain.model.WarrantyStatus;
import com.whalensoft.astrosetupsback.domain.repository.WarrantyRepository;
import com.whalensoft.astrosetupsback.infra.repository.JpaWarrantyRepository;
import org.springframework.transaction.annotation.Transactional;
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
    @Transactional(readOnly = true)
    public Optional<Warranty> findById(Long id) {
        return jpaWarrantyRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Warranty> findByUser(User user) {
        return jpaWarrantyRepository.findByUser(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Warranty> findByProduct(Product product) {
        return jpaWarrantyRepository.findByProduct(product);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Warranty> findByOrder(Order order) {
        return jpaWarrantyRepository.findByOrder(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Warranty> findByStatus(WarrantyStatus status) {
        return jpaWarrantyRepository.findByStatus(status);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Warranty> findByUserAndProduct(User user, Product product) {
        return jpaWarrantyRepository.findByUserAndProduct(user, product);
    }

    @Override
    public void deleteById(Long id) {
        jpaWarrantyRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsById(Long id) {
        return jpaWarrantyRepository.existsById(id);
    }
}