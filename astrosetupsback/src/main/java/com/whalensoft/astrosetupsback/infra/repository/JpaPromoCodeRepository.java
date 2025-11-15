package com.whalensoft.astrosetupsback.infra.repository;

import com.whalensoft.astrosetupsback.domain.model.PromoCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface JpaPromoCodeRepository extends JpaRepository<PromoCode, String> {

    @Query("""
           SELECT p FROM PromoCode p
           WHERE LOWER(p.code) = LOWER(:code)
           """)
    Optional<PromoCode> findByCode(@Param("code") String code);

    List<PromoCode> findByActiveTrue();

    List<PromoCode> findByActiveTrueAndExpirationDateAfter(LocalDateTime date);

    boolean existsByCode(String code);

    void deleteByCode(String code);

    // Método recomendado
    @Query("""
           SELECT p FROM PromoCode p
           WHERE p.active = true
           AND p.expirationDate > :now
           """)
    List<PromoCode> findValidPromoCodes(@Param("now") LocalDateTime now);
}