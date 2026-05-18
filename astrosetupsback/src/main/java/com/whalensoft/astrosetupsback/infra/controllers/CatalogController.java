package com.whalensoft.astrosetupsback.infra.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.whalensoft.astrosetupsback.application.dto.catalog.Category.CategoryDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Category.CategorySummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Category.CategoryTypeBasicDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Category.CategoryTypeDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Category.CreateCategoryDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Category.CreateCategoryTypeDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Product.CreateProductDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Product.ProductDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Product.ProductSearchDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Product.ProductSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Category.UpdateCategoryDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Product.UpdateProductDTO;
import com.whalensoft.astrosetupsback.application.dto.common.PageResponseDTO;
import com.whalensoft.astrosetupsback.application.interfaces.CatalogService;
import com.whalensoft.astrosetupsback.application.dto.catalog.Product.ProductDetailDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/catalog")
public class CatalogController {

    private final CatalogService catalogService;

    public CatalogController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    // =========================
    // PRODUCTOS
    // =========================

    @PostMapping("/products")
    public ResponseEntity<ProductDTO> createProduct(
            @Valid @RequestBody CreateProductDTO dto
    ) {

        return ResponseEntity.ok(
                catalogService.createProduct(dto)
        );
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProductDTO dto
    ) {

        return ResponseEntity.ok(
                catalogService.updateProduct(id, dto)
        );
    }

    /**
     * Catálogo principal paginado
     */
    @GetMapping("/products")
    public ResponseEntity<PageResponseDTO<ProductSummaryDTO>>
    getProducts(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "8")
            int size
    ) {

        return ResponseEntity.ok(
                catalogService.getProducts(page, size)
        );
    }

    /**
     * Búsqueda avanzada
     */
    @PostMapping("/products/_search")
    public ResponseEntity<PageResponseDTO<ProductSummaryDTO>>
    searchProducts(
            @RequestBody ProductSearchDTO searchDTO
    ) {

        return ResponseEntity.ok(
                catalogService.searchProducts(searchDTO)
        );
    }

    /**
     * Detalle producto
     */
    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDetailDTO> getProductById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                catalogService.getProductDetailById(id)
        );
    }

    /**
     * Productos destacados
     */
    @GetMapping("/products/featured")
    public ResponseEntity<List<ProductSummaryDTO>>
    getFeaturedProducts() {

        return ResponseEntity.ok(
                catalogService.getFeaturedProducts()
        );
    }

    /**
     * Nuevos productos
     */
    @GetMapping("/products/new-arrivals")
    public ResponseEntity<List<ProductSummaryDTO>>
    getNewArrivals() {

        return ResponseEntity.ok(
                catalogService.getNewArrivals()
        );
    }

    /**
     * Más vendidos
     */
    @GetMapping("/products/best-sellers")
    public ResponseEntity<List<ProductSummaryDTO>>
    getBestSellers() {

        return ResponseEntity.ok(
                catalogService.getBestSellers()
        );
    }

    /**
     * Productos por categoría
     */
    @GetMapping("/products/by-category")
    public ResponseEntity<PageResponseDTO<ProductSummaryDTO>>
    getProductsByCategory(

            @RequestParam Long categoryId,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "8")
            int size
    ) {

        return ResponseEntity.ok(
                catalogService.getProductsByCategory(
                        categoryId,
                        page,
                        size
                )
        );
    }

    // =========================
    // CATEGORÍAS
    // =========================

    @PostMapping("/categories")
    public ResponseEntity<CategoryDTO> createCategory(
            @Valid @RequestBody CreateCategoryDTO dto
    ) {

        return ResponseEntity.ok(
                catalogService.createCategory(dto)
        );
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCategoryDTO dto
    ) {

        return ResponseEntity.ok(
                catalogService.updateCategory(id, dto)
        );
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                catalogService.getCategoryById(id)
        );
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategorySummaryDTO>>
    getAllCategories() {

        return ResponseEntity.ok(
                catalogService.getAllCategories()
        );
    }

    // =========================
    // TIPOS DE CATEGORÍA
    // =========================

    @PostMapping("/category-types")
    public ResponseEntity<CategoryTypeDTO>
    createCategoryType(
            @Valid @RequestBody CreateCategoryTypeDTO dto
    ) {

        return ResponseEntity.ok(
                catalogService.createCategoryType(dto)
        );
    }

    @GetMapping("/category-types/{id}")
    public ResponseEntity<CategoryTypeDTO>
    getCategoryTypeById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                catalogService.getCategoryTypeById(id)
        );
    }

    @GetMapping("/category-types")
    public ResponseEntity<List<CategoryTypeBasicDTO>>
    getAllCategoryTypes() {

        return ResponseEntity.ok(
                catalogService.getAllCategoryTypes()
        );
    }
}