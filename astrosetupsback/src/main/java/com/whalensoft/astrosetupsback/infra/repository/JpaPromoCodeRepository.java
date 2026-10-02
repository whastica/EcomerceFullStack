package com.whalensoft.astrosetupsback.infra.repository;

import com.whalensoft.astrosetupsback.domain.model.PromoCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query("""
           SELECT p FROM PromoCode p
           WHERE (:searchTerm IS NULL OR LOWER(p.code) LIKE LOWER(CONCAT('%', :searchTerm, '%')))
           AND (:active IS NULL OR p.active = :active)
           AND (:minDiscount IS NULL OR p.discountPercentage >= :minDiscount)
           AND (:maxDiscount IS NULL OR p.discountPercentage <= :maxDiscount)
           AND (:forDiscounted IS NULL OR p.forDiscountedProductsOnly = :forDiscounted)
           AND (:onlyExpired = false OR (p.expirationDate IS NOT NULL AND p.expirationDate <= :now))
           AND (:onlyNotExpired = false OR p.expirationDate IS NULL OR p.expirationDate > :now)
           AND (:expiresBefore IS NULL OR (p.expirationDate IS NOT NULL AND p.expirationDate <= :expiresBefore))
           AND (:expiresAfter IS NULL OR (p.expirationDate IS NOT NULL AND p.expirationDate >= :expiresAfter))
           """)
    Page<PromoCode> searchPromoCodes(
            @Param("searchTerm") String searchTerm,
            @Param("active") Boolean active,
            @Param("minDiscount") Double minDiscount,
            @Param("maxDiscount") Double maxDiscount,
            @Param("forDiscounted") Boolean forDiscounted,
            @Param("onlyExpired") boolean onlyExpired,
            @Param("onlyNotExpired") boolean onlyNotExpired,
            @Param("now") LocalDateTime now,
            @Param("expiresBefore") LocalDateTime expiresBefore,
            @Param("expiresAfter") LocalDateTime expiresAfter,
            Pageable pageable
    );
}