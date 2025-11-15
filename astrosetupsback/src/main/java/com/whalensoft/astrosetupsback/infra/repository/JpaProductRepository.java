package com.whalensoft.astrosetupsback.infra.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.whalensoft.astrosetupsback.domain.model.Category;
import com.whalensoft.astrosetupsback.domain.model.Product;

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

    @Query("""
           SELECT DISTINCT p.brand
           FROM Product p
           WHERE p.active = true AND p.brand IS NOT NULL
           """)
    List<String> findDistinctBrands();

    @Query("""
           SELECT p FROM Product p
           WHERE (:categoryId IS NULL OR p.category.id = :categoryId)
           AND (:minPrice IS NULL OR p.price >= :minPrice)
           AND (:maxPrice IS NULL OR p.price <= :maxPrice)
           AND (:brand IS NULL OR p.brand = :brand)
           AND p.active = true
           """)
    Page<Product> findByFilters(
            @Param("categoryId") Long categoryId,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("brand") String brand,
            Pageable pageable
    );

    @Query("""
           SELECT p FROM Product p
           WHERE p.active = true
           AND p.discountPrice IS NOT NULL
           ORDER BY p.discountPrice ASC
           """)
    List<Product> findFeaturedProducts();

    @Query("""
           SELECT p FROM Product p
           WHERE p.active = true
           ORDER BY p.createdAt DESC
           """)
    List<Product> findNewArrivals();

    @Query("""
           SELECT p FROM Product p
           WHERE p.active = true
           ORDER BY SIZE(p.orderItems) DESC
           """)
    List<Product> findBestSellers();
}