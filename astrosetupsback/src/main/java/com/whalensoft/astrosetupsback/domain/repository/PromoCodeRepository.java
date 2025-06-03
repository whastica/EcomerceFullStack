package com.whalensoft.astrosetupsback.domain.repository;

import com.whalensoft.astrosetupsback.domain.model.PromoCode;
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
}