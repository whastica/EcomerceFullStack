package com.whalensoft.astrosetupsback.infra.repository;

import com.whalensoft.astrosetupsback.domain.model.Product;
import com.whalensoft.astrosetupsback.domain.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JpaProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(Category category);
    List<Product> findByActiveTrue();
    List<Product> findByActiveTrueAndCategory(Category category);
    Page<Product> findByActiveTrue(Pageable pageable);
    Page<Product> findByActiveTrueAndCategory(Category category, Pageable pageable);
    List<Product> findByActiveTrueAndDiscountPriceIsNotNull();
    List<Product> findByActiveTrueAndBrand(String brand);
    Page<Product> findByActiveTrueAndNameContainingIgnoreCase(String name, Pageable pageable);

    @Query("SELECT DISTINCT p.brand FROM Product p WHERE p.active = true AND p.brand IS NOT NULL")
    List<String> findDistinctBrands();
}