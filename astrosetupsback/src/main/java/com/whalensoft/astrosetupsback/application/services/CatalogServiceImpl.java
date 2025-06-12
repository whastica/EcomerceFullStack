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
import java.util.stream.Collectors;

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
        Pageable pageable = PageRequest.of(
                searchDTO.getPage(),
                searchDTO.getSize(),
                Sort.by(Sort.Direction.fromString(searchDTO.getSortDirection()), searchDTO.getSortBy())
        );

        Page<Product> productsPage = productRepository.findByFilters(
                searchDTO.getCategoryId(),
                searchDTO.getMinPrice(),
                searchDTO.getMaxPrice(),
                searchDTO.getBrand(),
                pageable
        );

        List<ProductSearchResultDTO> products = productsPage.getContent().stream()
                .map(this::convertToProductSearchResultDTO)
                .collect(Collectors.toList());

        return new PageResponseDTO<>(
                products,
                productsPage.getNumber(),
                productsPage.getSize(),
                productsPage.getTotalElements(),
                productsPage.getTotalPages()
        );
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));
        product.setActive(false);
        productRepository.save(product);
    }

    @Override
    public ProductStockStatusDTO getProductStockStatus(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));
        
        // TODO: Implementar lógica de verificación de stock
        return new ProductStockStatusDTO(id, true, 0);
    }

    @Override
    public List<ProductSummaryDTO> getFeaturedProducts() {
        return productRepository.findFeaturedProducts().stream()
                .map(this::convertToProductSummaryDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductSummaryDTO> getNewArrivals() {
        return productRepository.findNewArrivals().stream()
                .map(this::convertToProductSummaryDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductSummaryDTO> getBestSellers() {
        return productRepository.findBestSellers().stream()
                .map(this::convertToProductSummaryDTO)
                .collect(Collectors.toList());
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
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::convertToCategoryDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada"));
        categoryRepository.delete(category);
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
    public CategoryTypeDTO updateCategoryType(Long id, UpdateCategoryTypeDTO updateCategoryTypeDTO) {
        CategoryType categoryType = categoryTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de categoría no encontrado"));

        if (updateCategoryTypeDTO.getName() != null) {
            categoryType.setName(updateCategoryTypeDTO.getName());
        }

        CategoryType updatedCategoryType = categoryTypeRepository.save(categoryType);
        return convertToCategoryTypeDTO(updatedCategoryType);
    }

    @Override
    public CategoryTypeDTO getCategoryTypeById(Long id) {
        CategoryType categoryType = categoryTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de categoría no encontrado"));
        return convertToCategoryTypeDTO(categoryType);
    }

    @Override
    public List<CategoryTypeDTO> getAllCategoryTypes() {
        return categoryTypeRepository.findAll().stream()
                .map(this::convertToCategoryTypeDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCategoryType(Long id) {
        CategoryType categoryType = categoryTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de categoría no encontrado"));
        categoryTypeRepository.delete(categoryType);
    }

    private ProductDTO convertToProductDTO(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .brand(product.getBrand())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .hasVariations(product.getHasVariations())
                .active(product.getActive())
                .imageUrl(product.getImageUrl())
                .build();
    }

    private ProductSearchResultDTO convertToProductSearchResultDTO(Product product) {
        return ProductSearchResultDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .brand(product.getBrand())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .imageUrl(product.getImageUrl())
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
                .categoryTypeId(category.getCategoryType().getId())
                .categoryTypeName(category.getCategoryType().getName())
                .build();
    }

    private CategoryTypeDTO convertToCategoryTypeDTO(CategoryType categoryType) {
        return CategoryTypeDTO.builder()
                .id(categoryType.getId())
                .name(categoryType.getName())
                .build();
    }
} 