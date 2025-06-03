package com.whalensoft.astrosetupsback.infra.repository;

import com.whalensoft.astrosetupsback.domain.model.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

public interface JpaCategoryTypeRepository extends JpaRepository<CategoryType, Long> {
    Optional<CategoryType> findByName(String name);
}
