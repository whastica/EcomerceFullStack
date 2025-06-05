package com.whalensoft.astrosetupsback.infra.adapters;

import com.whalensoft.astrosetupsback.domain.model.CategoryType;
import com.whalensoft.astrosetupsback.domain.repository.CategoryTypeRepository;
import com.whalensoft.astrosetupsback.infra.repository.JpaCategoryTypeRepository;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CategoryTypeRepositoryAdapter implements CategoryTypeRepository {

    private final JpaCategoryTypeRepository jpaCategoryTypeRepository;

    @Override
    public CategoryType save(CategoryType categoryType) {
        return jpaCategoryTypeRepository.save(categoryType);
    }

    @Override
    public Optional<CategoryType> findById(Long id) {
        return jpaCategoryTypeRepository.findById(id);
    }

    @Override
    public List<CategoryType> findAll() {
        return jpaCategoryTypeRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        jpaCategoryTypeRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return jpaCategoryTypeRepository.existsById(id);
    }

    @Override
    public Optional<CategoryType> findByName(String name) {
        return jpaCategoryTypeRepository.findByName(name);
    }
}
