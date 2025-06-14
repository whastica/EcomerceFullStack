package com.whalensoft.astrosetupsback.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.whalensoft.astrosetupsback.domain.model.Category;
import com.whalensoft.astrosetupsback.domain.model.Product;

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
    
    // Nuevo método para búsqueda con filtros
    Page<Product> findByFilters(Long categoryId, Double minPrice, Double maxPrice, String brand, Pageable pageable);
    
    // Nuevos métodos para productos destacados
    List<Product> findFeaturedProducts();
    List<Product> findNewArrivals();
    List<Product> findBestSellers();
}