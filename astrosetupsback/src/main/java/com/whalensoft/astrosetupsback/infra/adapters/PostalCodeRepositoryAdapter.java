package com.whalensoft.astrosetupsback.infra.adapters;

import com.whalensoft.astrosetupsback.domain.model.PostalCode;
import com.whalensoft.astrosetupsback.domain.repository.PostalCodeRepository;
import com.whalensoft.astrosetupsback.infra.repository.JpaPostalCodeRepository;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class PostalCodeRepositoryAdapter implements PostalCodeRepository {

    private final JpaPostalCodeRepository jpaPostalCodeRepository;

    @Override
    public PostalCode save(PostalCode postalCode) {
        return jpaPostalCodeRepository.save(postalCode);
    }

    @Override
    public Optional<PostalCode> findById(Long id) {
        return jpaPostalCodeRepository.findById(id);
    }

    @Override
    public List<PostalCode> findAll() {
        return jpaPostalCodeRepository.findAll();
    }

    @Override
    public Optional<PostalCode> findByCode(String code) {
        return jpaPostalCodeRepository.findByCode(code);
    }

    @Override
    public void deleteById(Long id) {
        jpaPostalCodeRepository.deleteById(id);
    }

    @Override
    public boolean existsByCode(String code) {
        return jpaPostalCodeRepository.existsByCode(code);
    }
}