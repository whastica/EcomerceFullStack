package com.whalensoft.astrosetupsback.infra.adapters;

import com.whalensoft.astrosetupsback.domain.model.PromoCode;
import com.whalensoft.astrosetupsback.domain.repository.PromoCodeRepository;
import com.whalensoft.astrosetupsback.infra.repository.JpaPromoCodeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class PromoCodeRepositoryAdapter implements PromoCodeRepository {

    private final JpaPromoCodeRepository jpaPromoCodeRepository;

    @Override
    public PromoCode save(PromoCode promoCode) {
        return jpaPromoCodeRepository.save(promoCode);
    }

    @Override
    public Optional<PromoCode> findByCode(String code) {
        return jpaPromoCodeRepository.findByCode(code);
    }

    @Override
    public List<PromoCode> findByActiveTrue() {
        return jpaPromoCodeRepository.findByActiveTrue();
    }

    @Override
    public List<PromoCode> findByActiveTrueAndExpirationDateAfter(LocalDateTime date) {
        return jpaPromoCodeRepository.findByActiveTrueAndExpirationDateAfter(date);
    }

    @Override
    public void deleteByCode(String code) {
        jpaPromoCodeRepository.deleteByCode(code);
    }

    @Override
    public boolean existsByCode(String code) {
        return jpaPromoCodeRepository.existsByCode(code);
    }

    @Override
    public List<PromoCode> findValidPromoCodes(LocalDateTime now) {
        return jpaPromoCodeRepository.findValidPromoCodes(now);
    }

    @Override
    public List<PromoCode> findAllPromoCodes() {
        return jpaPromoCodeRepository.findAll();
    }

    @Override
    public Page<PromoCode> searchPromoCodes(
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
    ) {
        return jpaPromoCodeRepository.searchPromoCodes(
                searchTerm, active, minDiscount, maxDiscount, forDiscounted,
                onlyExpired, onlyNotExpired, now, expiresBefore, expiresAfter, pageable
        );
    }
}