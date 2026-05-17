package com.whalensoft.astrosetupsback.application.interfaces;

import com.whalensoft.astrosetupsback.application.dto.catalog.Category.*;
import com.whalensoft.astrosetupsback.application.dto.catalog.Product.*;
import com.whalensoft.astrosetupsback.application.dto.common.PageResponseDTO;

import java.util.List;

public interface CatalogService {

    ProductDTO createProduct(CreateProductDTO dto);

    ProductDTO updateProduct(
            Long id,
            UpdateProductDTO dto
    );

    ProductDetailDTO getProductDetailById(
            Long id
    );

    PageResponseDTO<ProductSummaryDTO> getProducts(
            int page,
            int size
    );

    PageResponseDTO<ProductSummaryDTO> searchProducts(
            ProductSearchDTO searchDTO
    );

    PageResponseDTO<ProductSummaryDTO>
    getProductsByCategory(
            Long categoryId,
            int page,
            int size
    );

    void deleteProduct(Long id);

    List<ProductSummaryDTO> getFeaturedProducts();

    List<ProductSummaryDTO> getNewArrivals();

    List<ProductSummaryDTO> getBestSellers();

    CategoryDTO createCategory(CreateCategoryDTO dto);

    CategoryDTO updateCategory(
            Long id,
            UpdateCategoryDTO dto
    );

    CategoryDTO getCategoryById(Long id);

    List<CategorySummaryDTO> getAllCategories();

    void deleteCategory(Long id);

    CategoryTypeDTO createCategoryType(
            CreateCategoryTypeDTO dto
    );

    CategoryTypeDTO getCategoryTypeById(
            Long id
    );

    List<CategoryTypeBasicDTO>
    getAllCategoryTypes();

    void deleteCategoryType(Long id);
}