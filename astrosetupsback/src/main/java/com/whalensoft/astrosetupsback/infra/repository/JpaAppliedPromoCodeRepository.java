package com.whalensoft.astrosetupsback.infra.repository;

import com.whalensoft.astrosetupsback.domain.model.AppliedPromoCode;
import com.whalensoft.astrosetupsback.domain.model.AppliedPromoCodeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaAppliedPromoCodeRepository extends JpaRepository<AppliedPromoCode, AppliedPromoCodeId> {
}
