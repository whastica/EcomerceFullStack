package com.whalensoft.astrosetupsback.application.services;

import com.whalensoft.astrosetupsback.application.DTO.catalog.*;
import com.whalensoft.astrosetupsback.application.DTO.common.PageResponseDTO;
import com.whalensoft.astrosetupsback.application.interfaces.CatalogService;
import com.whalensoft.astrosetupsback.domain.model.Category;
import com.whalensoft.astrosetupsback.domain.model.CategoryType;
import com.whalensoft.astrosetupsback.domain.model.Product;
import com.whalensoft.astrosetupsback.domain.repository.CategoryRepository;
import com.whalensoft.astrosetupsback.domain.repository.CategoryTypeRepository;
import com.whalensoft.astrosetupsback.domain.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CatalogServiceImpl implements CatalogService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryTypeRepository categoryTypeRepository;

    @Override
    public ProductDTO createProduct(CreateProductDTO createProductDTO) {
        Category category = categoryRepository.findById(createProductDTO.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada"));

        Product product = Product.builder()
                .name(createProductDTO.getName())
                .description(createProductDTO.getDescription())
                .price(createProductDTO.getPrice())
                .discountPrice(createProductDTO.getDiscountPrice())
                .brand(createProductDTO.getBrand())
                .category(category)
                .imageUrl(createProductDTO.getImageUrl())
                .hasVariations(createProductDTO.getHasVariations())
                .active(true)
                .build();

        Product savedProduct = productRepository.save(product);
        return convertToProductDTO(savedProduct);
    }

    @Override
    public ProductDTO updateProduct(Long id, UpdateProductDTO updateProductDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));

        if (updateProductDTO.getName() != null) {
            product.setName(updateProductDTO.getName());
        }
        if (updateProductDTO.getDescription() != null) {
            product.setDescription(updateProductDTO.getDescription());
        }
        if (updateProductDTO.getPrice() != null) {
            product.setPrice(updateProductDTO.getPrice());
        }
        if (updateProductDTO.getDiscountPrice() != null) {
            product.setDiscountPrice(updateProductDTO.getDiscountPrice());
        }
        if (updateProductDTO.getBrand() != null) {
            product.setBrand(updateProductDTO.getBrand());
        }
        if (updateProductDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(updateProductDTO.getCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada"));
            product.setCategory(category);
        }
        if (updateProductDTO.getImageUrl() != null) {
            product.setImageUrl(updateProductDTO.getImageUrl());
        }
        if (updateProductDTO.getHasVariations() != null) {
            product.setHasVariations(updateProductDTO.getHasVariations());
        }
        if (updateProductDTO.getActive() != null) {
            product.setActive(updateProductDTO.getActive());
        }

        Product updatedProduct = productRepository.save(product);
        return convertToProductDTO(updatedProduct);
    }

    @Override
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));
        return convertToProductDTO(product);
    }

    @Override
    public PageResponseDTO<ProductSearchResultDTO> searchProducts(ProductSearchDTO searchDTO) {
        // Crear el objeto Pageable para la paginación
        Pageable pageable = PageRequest.of(
                searchDTO.getPage(),
                searchDTO.getSize(),
                Sort.by(Sort.Direction.fromString(searchDTO.getSortDirection()), searchDTO.getSortBy())
        );

        // Realizar la búsqueda
        Page<Product> productsPage = productRepository.findByFilters(
            searchDTO.getCategoryId(),
            searchDTO.getMinPrice(),
            searchDTO.getMaxPrice(),
            searchDTO.getBrand(),
            pageable
        );

        // Convertir los productos a DTOs
        List<ProductSummaryDTO> productSummaries = productsPage.getContent().stream()
                .map(this::convertToProductSummaryDTO)
                .toList();

        // Crear el resultado de búsqueda
        ProductSearchResultDTO searchResult = ProductSearchResultDTO.builder()
                .products(productSummaries)
                .totalElements(productsPage.getTotalElements())
                .totalPages(productsPage.getTotalPages())
                .currentPage(productsPage.getNumber())
                .pageSize(productsPage.getSize())
                .hasNext(productsPage.hasNext())
                .hasPrevious(productsPage.hasPrevious())
                .build();

        return PageResponseDTO.<ProductSearchResultDTO>builder()
                .content(List.of(searchResult))
                .currentPage(productsPage.getNumber())
                .totalPages(productsPage.getTotalPages())
                .totalElements(productsPage.getTotalElements())
                .size(productsPage.getSize())
                .first(productsPage.isFirst())
                .last(productsPage.isLast())
                .empty(productsPage.isEmpty())
                .numberOfElements(productsPage.getNumberOfElements())
                .build();
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));
        product.setActive(false);
        productRepository.save(product);
    }


    @Override
    public List<ProductSummaryDTO> getFeaturedProducts() {
        return productRepository.findFeaturedProducts().stream()
                .map(this::convertToProductSummaryDTO)
                .toList();
    }

    @Override
    public List<ProductSummaryDTO> getNewArrivals() {
        return productRepository.findNewArrivals().stream()
                .map(this::convertToProductSummaryDTO)
                .toList();
    }

    @Override
    public List<ProductSummaryDTO> getBestSellers() {
        return productRepository.findBestSellers().stream()
                .map(this::convertToProductSummaryDTO)
                .toList();
    }

    @Override
    public CategoryDTO createCategory(CreateCategoryDTO createCategoryDTO) {
        CategoryType categoryType = categoryTypeRepository.findById(createCategoryDTO.getCategoryTypeId())
                .orElseThrow(() -> new EntityNotFoundException("Tipo de categoría no encontrado"));

        Category category = Category.builder()
                .name(createCategoryDTO.getName())
                .categoryType(categoryType)
                .build();

        Category savedCategory = categoryRepository.save(category);
        return convertToCategoryDTO(savedCategory);
    }

    @Override
    public CategoryDTO updateCategory(Long id, UpdateCategoryDTO updateCategoryDTO) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada"));

        if (updateCategoryDTO.getName() != null) {
            category.setName(updateCategoryDTO.getName());
        }
        if (updateCategoryDTO.getCategoryTypeId() != null) {
            CategoryType categoryType = categoryTypeRepository.findById(updateCategoryDTO.getCategoryTypeId())
                    .orElseThrow(() -> new EntityNotFoundException("Tipo de categoría no encontrado"));
            category.setCategoryType(categoryType);
        }

        Category updatedCategory = categoryRepository.save(category);
        return convertToCategoryDTO(updatedCategory);
    }

    @Override
    public CategoryDTO getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada"));
        return convertToCategoryDTO(category);
    }

    @Override
    public List<CategorySummaryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(category -> CategorySummaryDTO.builder()
                        .id(category.getId())
                        .name(category.getName())
                        .categoryTypeName(category.getCategoryType().getName())
                        .productCount(category.getProducts().size())
                        .build())
                .toList();
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public CategoryTypeDTO createCategoryType(CreateCategoryTypeDTO createCategoryTypeDTO) {
        CategoryType categoryType = CategoryType.builder()
                .name(createCategoryTypeDTO.getName())
                .build();

        CategoryType savedCategoryType = categoryTypeRepository.save(categoryType);
        return convertToCategoryTypeDTO(savedCategoryType);
    }

    @Override
    public CategoryTypeDTO getCategoryTypeById(Long id) {
        CategoryType categoryType = categoryTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de categoría no encontrado"));
        return convertToCategoryTypeDTO(categoryType);
    }

    @Override
    public List<CategoryTypeBasicDTO> getAllCategoryTypes() {
        return categoryTypeRepository.findAll().stream()
                .map(categoryType -> CategoryTypeBasicDTO.builder()
                        .id(categoryType.getId())
                        .name(categoryType.getName())
                        .build())
                .toList();
    }

    @Override
    public void deleteCategoryType(Long id) {
        if (!categoryTypeRepository.existsById(id)) {
            throw new EntityNotFoundException("Tipo de categoría no encontrado");
        }
        categoryTypeRepository.deleteById(id);
    }

    private ProductDTO convertToProductDTO(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .brand(product.getBrand())
                .imageUrl(product.getImageUrl())
                .hasVariations(product.getHasVariations())
                .active(product.getActive())
                .category(CategorySummaryDTO.builder()
                        .id(product.getCategory().getId())
                        .name(product.getCategory().getName())
                        .categoryTypeName(product.getCategory().getCategoryType().getName())
                        .productCount(product.getCategory().getProducts().size())
                        .build())
                .hasDiscount(product.hasDiscount())
                .effectivePrice(product.getEffectivePrice())
                .discountPercentage(product.hasDiscount() ? 
                    ((product.getPrice() - product.getDiscountPrice()) / product.getPrice()) * 100 : null)
                .build();
    }


    private ProductSummaryDTO convertToProductSummaryDTO(Product product) {
        return ProductSummaryDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .brand(product.getBrand())
                .imageUrl(product.getImageUrl())
                .hasDiscount(product.hasDiscount())
                .build();
    }

    private CategoryDTO convertToCategoryDTO(Category category) {
        return CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .categoryType(CategoryTypeDTO.builder()
                        .id(category.getCategoryType().getId())
                        .name(category.getCategoryType().getName())
                        .build())
                .productCount(category.getProducts().size())
                .build();
    }

    private CategoryTypeDTO convertToCategoryTypeDTO(CategoryType categoryType) {
        return CategoryTypeDTO.builder()
                .id(categoryType.getId())
                .name(categoryType.getName())
                .build();
    }
} 