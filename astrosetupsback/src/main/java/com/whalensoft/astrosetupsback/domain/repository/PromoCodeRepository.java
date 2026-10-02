package com.whalensoft.astrosetupsback.domain.repository;

import com.whalensoft.astrosetupsback.domain.model.PromoCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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

    // MǸtodo recomendado
    List<PromoCode> findValidPromoCodes(LocalDateTime now);

    // Admin
    List<PromoCode> findAllPromoCodes();

    Page<PromoCode> searchPromoCodes(
            String searchTerm,
            Boolean active,
            Double minDiscount,
            Double maxDiscount,
            Boolean forDiscounted,
            boolean onlyExpired,
            boolean onlyNotExpired,
            LocalDateTime now,
            LocalDateTime expiresBefore,
            LocalDateTime expiresAfter,
            Pageable pageable
    );
}