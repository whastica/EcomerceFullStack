package com.whalensoft.astrosetupsback.infra.adapters;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.whalensoft.astrosetupsback.domain.model.Category;
import com.whalensoft.astrosetupsback.domain.model.Product;
import com.whalensoft.astrosetupsback.domain.repository.ProductRepository;
import com.whalensoft.astrosetupsback.infra.repository.JpaProductRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ProductRepositoryAdapter implements ProductRepository {

    private final JpaProductRepository jpaProductRepository;

    @Override
    public Product save(Product product) {
        return jpaProductRepository.save(product);
    }

    @Override
    public Optional<Product> findById(Long id) {
        return jpaProductRepository.findById(id);
    }

    @Override
    public List<Product> findByCategory(Category category) {
        return jpaProductRepository.findByCategory(category);
    }

    @Override
    public List<Product> findByActiveTrue() {
        return jpaProductRepository.findByActiveTrue();
    }

    @Override
    public List<Product> findByActiveTrueAndCategory(Category category) {
        return jpaProductRepository.findByActiveTrueAndCategory(category);
    }

    @Override
    public Page<Product> findByActiveTrue(Pageable pageable) {
        return jpaProductRepository.findByActiveTrue(pageable);
    }

    @Override
    public Page<Product> findByActiveTrueAndCategory(Category category, Pageable pageable) {
        return jpaProductRepository.findByActiveTrueAndCategory(category, pageable);
    }

    @Override
    public List<Product> findByActiveTrueAndDiscountPriceIsNotNull() {
        return jpaProductRepository.findByActiveTrueAndDiscountPriceIsNotNull();
    }

    @Override
    public List<Product> findByActiveTrueAndBrand(String brand) {
        return jpaProductRepository.findByActiveTrueAndBrand(brand);
    }

    @Override
    public Page<Product> findByActiveTrueAndNameContainingIgnoreCase(String name, Pageable pageable) {
        return jpaProductRepository.findByActiveTrueAndNameContainingIgnoreCase(name, pageable);
    }

    @Override
    public void deleteById(Long id) {
        jpaProductRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return jpaProductRepository.existsById(id);
    }

    @Override
    public List<String> findDistinctBrands() {
        return jpaProductRepository.findDistinctBrands();
    }

    @Override
    public Page<Product> findByFilters(Long categoryId, Double minPrice, Double maxPrice, String brand, Pageable pageable) {
        return jpaProductRepository.findByFilters(categoryId, minPrice, maxPrice, brand, pageable);
    }

    @Override
    public List<Product> findFeaturedProducts() {
        return jpaProductRepository.findFeaturedProducts();
    }

    @Override
    public List<Product> findNewArrivals() {
        return jpaProductRepository.findNewArrivals();
    }

    @Override
    public List<Product> findBestSellers() {
        return jpaProductRepository.findBestSellers();
    }
}