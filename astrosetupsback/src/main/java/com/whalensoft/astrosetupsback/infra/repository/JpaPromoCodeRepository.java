package com.whalensoft.astrosetupsback.infra.repository;

import com.whalensoft.astrosetupsback.domain.model.PromoCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface JpaPromoCodeRepository extends JpaRepository<PromoCode, String> {
    Optional<PromoCode> findByCode(String code);
    List<PromoCode> findByActiveTrue();
    List<PromoCode> findByActiveTrueAndExpirationDateAfter(LocalDateTime date);
    boolean existsByCode(String code);
}