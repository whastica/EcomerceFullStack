package com.whalensoft.astrosetupsback.domain.repository;

import com.whalensoft.astrosetupsback.domain.model.Category;
import com.whalensoft.astrosetupsback.domain.model.CategoryType;
import java.util.List;
import java.util.Optional;

public interface CategoryRepository {
    Category save(Category category);
    Optional<Category> findById(Long id);
    List<Category> findAll();
    List<Category> findByCategoryType(CategoryType categoryType);
    void deleteById(Long id);
    boolean existsById(Long id);
    Optional<Category> findByName(String name);
}