package com.whalensoft.astrosetupsback.infra.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whalensoft.astrosetupsback.application.dto.catalog.Category.CategoryDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Category.CategorySummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Category.CategoryTypeBasicDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Category.CategoryTypeDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Category.CreateCategoryDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Category.CreateCategoryTypeDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Product.CreateProductDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Product.ProductDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Product.ProductSearchDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Product.ProductSearchResultDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Product.ProductSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Category.UpdateCategoryDTO;
import com.whalensoft.astrosetupsback.application.dto.catalog.Product.UpdateProductDTO;
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

    @PostMapping("/products/_search")
    public ResponseEntity<PageResponseDTO<ProductSearchResultDTO>> searchProducts(@RequestBody ProductSearchDTO searchDTO) {
        return ResponseEntity.ok(catalogService.searchProducts(searchDTO));
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(catalogService.getProductById(id));
    }

    /* Recomendacion de mejor deshabilitar un producto en lugar de eliminarlo
    pero tanmbien hay que consultarlo

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        catalogService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }*/

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

    // No se puede eliminar una categoria por que hay productos adjuntos a ella en este caso
    // Tocara eliminar los productos que tiene y luego eliminar la categoria la otra es inhabilitarla
    /*@DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        catalogService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }*/

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
    //Tiene categorias y productos asjuntos por eso no es posible eliminarla asi por asi
    //Ocurre lo mismo que en category
    /*@DeleteMapping("/category-types/{id}")
    public ResponseEntity<Void> deleteCategoryType(@PathVariable Long id) {
        catalogService.deleteCategoryType(id);
        return ResponseEntity.noContent().build();
    }*/
}
