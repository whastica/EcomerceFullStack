package com.whalensoft.astrosetupsback.infra.repository;

import com.whalensoft.astrosetupsback.domain.model.Category;
import com.whalensoft.astrosetupsback.domain.model.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface JpaCategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByCategoryType(CategoryType categoryType);
    Optional<Category> findByName(String name);
}