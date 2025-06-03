package com.whalensoft.astrosetupsback.infra.repository;

import com.whalensoft.astrosetupsback.domain.model.PostalCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface JpaPostalCodeRepository extends JpaRepository<PostalCode, Long> {
    Optional<PostalCode> findByCode(String code);
    boolean existsByCode(String code);
}