package com.whalensoft.astrosetupsback.application.interfaces;

import com.whalensoft.astrosetupsback.application.DTO.catalog.*;
import com.whalensoft.astrosetupsback.application.DTO.common.PageResponseDTO;

import java.util.List;

public interface CatalogService {
    // Productos
    ProductDTO createProduct(CreateProductDTO createProductDTO);
    ProductDTO updateProduct(Long id, UpdateProductDTO updateProductDTO);
    ProductDTO getProductById(Long id);
    PageResponseDTO<ProductSearchResultDTO> searchProducts(ProductSearchDTO searchDTO);
    void deleteProduct(Long id);
    List<ProductSummaryDTO> getFeaturedProducts();
    List<ProductSummaryDTO> getNewArrivals();
    List<ProductSummaryDTO> getBestSellers();

    // Categorías
    CategoryDTO createCategory(CreateCategoryDTO createCategoryDTO);
    CategoryDTO updateCategory(Long id, UpdateCategoryDTO updateCategoryDTO);
    CategoryDTO getCategoryById(Long id);
    List<CategorySummaryDTO> getAllCategories();
    void deleteCategory(Long id);

    // Tipos de Categoría
    CategoryTypeDTO createCategoryType(CreateCategoryTypeDTO createCategoryTypeDTO);
    CategoryTypeDTO getCategoryTypeById(Long id);
    List<CategoryTypeBasicDTO> getAllCategoryTypes();
    void deleteCategoryType(Long id);
} 