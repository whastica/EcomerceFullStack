package com.whalensoft.astrosetupsback.infra.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whalensoft.astrosetupsback.application.dto.catalog.CategoryDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.CategorySummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.CategoryTypeBasicDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.CategoryTypeDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.CreateCategoryDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.CreateCategoryTypeDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.CreateProductDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.ProductDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.ProductSearchDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.ProductSearchResultDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.ProductSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.UpdateCategoryDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.UpdateProductDTO;
import com.whalensoft.astrosetupsback.application.dto.common.PageResponseDTO;
import com.whalensoft.astrosetupsback.application.interfaces.CatalogService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/catalog")
public class CatalogController {
    private final CatalogService catalogService;

    public CatalogController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    // --- Productos ---
    @PostMapping("/products")
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody CreateProductDTO dto) {
        return ResponseEntity.ok(catalogService.createProduct(dto));
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @Valid @RequestBody UpdateProductDTO dto) {
        return ResponseEntity.ok(catalogService.updateProduct(id, dto));
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(catalogService.getProductById(id));
    }

    @PostMapping("/products/search")
    public ResponseEntity<PageResponseDTO<ProductSearchResultDTO>> searchProducts(@RequestBody ProductSearchDTO searchDTO) {
        return ResponseEntity.ok(catalogService.searchProducts(searchDTO));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        catalogService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/products/featured")
    public ResponseEntity<List<ProductSummaryDTO>> getFeaturedProducts() {
        return ResponseEntity.ok(catalogService.getFeaturedProducts());
    }

    @GetMapping("/products/new-arrivals")
    public ResponseEntity<List<ProductSummaryDTO>> getNewArrivals() {
        return ResponseEntity.ok(catalogService.getNewArrivals());
    }

    @GetMapping("/products/best-sellers")
    public ResponseEntity<List<ProductSummaryDTO>> getBestSellers() {
        return ResponseEntity.ok(catalogService.getBestSellers());
    }

    // --- Categorías ---
    @PostMapping("/categories")
    public ResponseEntity<CategoryDTO> createCategory(@Valid @RequestBody CreateCategoryDTO dto) {
        return ResponseEntity.ok(catalogService.createCategory(dto));
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long id, @Valid @RequestBody UpdateCategoryDTO dto) {
        return ResponseEntity.ok(catalogService.updateCategory(id, dto));
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(catalogService.getCategoryById(id));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategorySummaryDTO>> getAllCategories() {
        return ResponseEntity.ok(catalogService.getAllCategories());
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        catalogService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    // --- Tipos de Categoría ---
    @PostMapping("/category-types")
    public ResponseEntity<CategoryTypeDTO> createCategoryType(@Valid @RequestBody CreateCategoryTypeDTO dto) {
        return ResponseEntity.ok(catalogService.createCategoryType(dto));
    }

    @GetMapping("/category-types/{id}")
    public ResponseEntity<CategoryTypeDTO> getCategoryTypeById(@PathVariable Long id) {
        return ResponseEntity.ok(catalogService.getCategoryTypeById(id));
    }

    @GetMapping("/category-types")
    public ResponseEntity<List<CategoryTypeBasicDTO>> getAllCategoryTypes() {
        return ResponseEntity.ok(catalogService.getAllCategoryTypes());
    }

    @DeleteMapping("/category-types/{id}")
    public ResponseEntity<Void> deleteCategoryType(@PathVariable Long id) {
        catalogService.deleteCategoryType(id);
        return ResponseEntity.noContent().build();
    }
}
