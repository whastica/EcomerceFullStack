package com.whalensoft.astrosetupsback.domain.repository;

import com.whalensoft.astrosetupsback.domain.model.PromoCode;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PromoCodeRepository {

    PromoCode save(PromoCode promoCode);

    Optional<PromoCode> findByCode(String code);

    List<PromoCode> findByActiveTrue();

    List<PromoCode> findByActiveTrueAndExpirationDateAfter(LocalDateTime date);

    void deleteByCode(String code);

    boolean existsByCode(String code);

    // Método recomendado
    List<PromoCode> findValidPromoCodes(LocalDateTime now);
}