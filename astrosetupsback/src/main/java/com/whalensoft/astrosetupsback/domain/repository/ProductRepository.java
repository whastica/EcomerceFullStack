package com.whalensoft.astrosetupsback.domain.repository;

import com.whalensoft.astrosetupsback.domain.model.Product;
import com.whalensoft.astrosetupsback.domain.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface ProductRepository {
    Product save(Product product);
    Optional<Product> findById(Long id);
    List<Product> findByCategory(Category category);
    List<Product> findByActiveTrue();
    List<Product> findByActiveTrueAndCategory(Category category);
    Page<Product> findByActiveTrue(Pageable pageable);
    Page<Product> findByActiveTrueAndCategory(Category category, Pageable pageable);
    List<Product> findByActiveTrueAndDiscountPriceIsNotNull();
    List<Product> findByActiveTrueAndBrand(String brand);
    Page<Product> findByActiveTrueAndNameContainingIgnoreCase(String name, Pageable pageable);
    void deleteById(Long id);
    boolean existsById(Long id);
    List<String> findDistinctBrands();
}