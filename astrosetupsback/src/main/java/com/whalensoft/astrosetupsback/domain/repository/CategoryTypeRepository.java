package com.whalensoft.astrosetupsback.domain.repository;

import com.whalensoft.astrosetupsback.domain.model.CategoryType;
import java.util.List;
import java.util.Optional;

public interface CategoryTypeRepository {
    CategoryType save(CategoryType categoryType);
    Optional<CategoryType> findById(Long id);
    List<CategoryType> findAll();
    void deleteById(Long id);
    boolean existsById(Long id);
    Optional<CategoryType> findByName(String name);
}