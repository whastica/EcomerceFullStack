package com.whalensoft.astrosetupsback.infra.adapters;

import com.whalensoft.astrosetupsback.domain.model.Category;
import com.whalensoft.astrosetupsback.domain.model.CategoryType;
import com.whalensoft.astrosetupsback.domain.repository.CategoryRepository;
import com.whalensoft.astrosetupsback.infra.repository.JpaCategoryRepository;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CategoryRepositoryAdapter implements CategoryRepository {

    private final JpaCategoryRepository jpaCategoryRepository;

    @Override
    public Category save(Category category) {
        return jpaCategoryRepository.save(category);
    }

    @Override
    public Optional<Category> findById(Long id) {
        return jpaCategoryRepository.findById(id);
    }

    @Override
    public List<Category> findAll() {
        return jpaCategoryRepository.findAll();
    }

    @Override
    public List<Category> findByCategoryType(CategoryType categoryType) {
        return jpaCategoryRepository.findByCategoryType(categoryType);
    }

    @Override
    public Optional<Category> findByName(String name) {
        return jpaCategoryRepository.findByName(name);
    }

    @Override
    public boolean existsById(Long id) {
        return jpaCategoryRepository.existsById(id);
    }

    @Override
    public boolean existsByName(String name) {
        return jpaCategoryRepository.existsByName(name);
    }

    @Override
    public void deleteById(Long id) {
        jpaCategoryRepository.deleteById(id);
    }
}