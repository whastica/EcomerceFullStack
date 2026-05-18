package com.whalensoft.astrosetupsback.application.services;

import com.whalensoft.astrosetupsback.application.dto.catalog.Category.*;
import com.whalensoft.astrosetupsback.application.dto.catalog.Product.*;
import com.whalensoft.astrosetupsback.application.dto.common.PageResponseDTO;
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

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CatalogServiceImpl implements CatalogService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryTypeRepository categoryTypeRepository;

    // =========================================================
    // PRODUCTOS
    // =========================================================

    @Override
    public ProductDTO createProduct(
            CreateProductDTO createProductDTO
    ) {

        Category category = categoryRepository.findById(
                        createProductDTO.getCategoryId()
                )
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Categoría no encontrada"
                        )
                );

        Product product = Product.builder()
                .name(createProductDTO.getName())
                .description(createProductDTO.getDescription())
                .price(createProductDTO.getPrice())
                .discountPrice(
                        createProductDTO.getDiscountPrice()
                )
                .brand(createProductDTO.getBrand())
                .category(category)
                .imageUrl(createProductDTO.getImageUrl())
                .hasVariations(
                        createProductDTO.getHasVariations()
                )
                .active(true)
                .build();

        Product savedProduct =
                productRepository.save(product);

        return convertToProductDTO(savedProduct);
    }

    @Override
    public ProductDTO updateProduct(
            Long id,
            UpdateProductDTO updateProductDTO
    ) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Producto no encontrado"
                        )
                );

        if (updateProductDTO.getName() != null) {
            product.setName(updateProductDTO.getName());
        }

        if (updateProductDTO.getDescription() != null) {
            product.setDescription(
                    updateProductDTO.getDescription()
            );
        }

        if (updateProductDTO.getPrice() != null) {
            product.setPrice(updateProductDTO.getPrice());
        }

        if (updateProductDTO.getDiscountPrice() != null) {
            product.setDiscountPrice(
                    updateProductDTO.getDiscountPrice()
            );
        }

        if (updateProductDTO.getBrand() != null) {
            product.setBrand(updateProductDTO.getBrand());
        }

        if (updateProductDTO.getCategoryId() != null) {

            Category category =
                    categoryRepository.findById(
                                    updateProductDTO.getCategoryId()
                            )
                            .orElseThrow(() ->
                                    new EntityNotFoundException(
                                            "Categoría no encontrada"
                                    )
                            );

            product.setCategory(category);
        }

        if (updateProductDTO.getImageUrl() != null) {
            product.setImageUrl(
                    updateProductDTO.getImageUrl()
            );
        }

        if (updateProductDTO.getHasVariations() != null) {
            product.setHasVariations(
                    updateProductDTO.getHasVariations()
            );
        }

        if (updateProductDTO.getActive() != null) {
            product.setActive(
                    updateProductDTO.getActive()
            );
        }

        Product updatedProduct =
                productRepository.save(product);

        return convertToProductDTO(updatedProduct);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductDetailDTO getProductDetailById(
            Long id
    ) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Producto no encontrado"
                        )
                );

        return convertToProductDetailDTO(product);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponseDTO<ProductSummaryDTO>
    getProducts(
            int page,
            int size
    ) {

        Pageable pageable =
                PageRequest.of(page, size);

        Page<Product> productsPage =
                productRepository.findByActiveTrue(
                        pageable
                );

        List<ProductSummaryDTO> products =
                productsPage.getContent()
                        .stream()
                        .map(this::convertToProductSummaryDTO)
                        .toList();

        return PageResponseDTO.<ProductSummaryDTO>builder()
                .content(products)
                .currentPage(productsPage.getNumber())
                .totalPages(productsPage.getTotalPages())
                .totalElements(productsPage.getTotalElements())
                .size(productsPage.getSize())
                .first(productsPage.isFirst())
                .last(productsPage.isLast())
                .empty(productsPage.isEmpty())
                .numberOfElements(
                        productsPage.getNumberOfElements()
                )
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponseDTO<ProductSummaryDTO> searchProducts(ProductSearchDTO searchDTO) {

        // Mapeo seguro de sortBy a campo real de la entidad
        String sortField = switch (searchDTO.getSortBy() != null ? searchDTO.getSortBy() : "name") {
            case "price"    -> "price";
            case "newest"   -> "createdAt";
            case "discount" -> "discountPrice";
            default         -> "name";
        };

        String sortDir = "desc".equalsIgnoreCase(searchDTO.getSortDirection())
                ? "desc" : "asc";

        Pageable pageable = PageRequest.of(
                searchDTO.getPage(),
                searchDTO.getSize(),
                Sort.by(Sort.Direction.fromString(sortDir), sortField)
        );

        Page<Product> productsPage = productRepository.findByFilters(
                searchDTO.getCategoryId(),
                searchDTO.getMinPrice(),
                searchDTO.getMaxPrice(),
                searchDTO.getBrand(),
                pageable
        );

        List<ProductSummaryDTO> products = productsPage.getContent()
                .stream()
                .map(this::convertToProductSummaryDTO)
                .toList();

        return PageResponseDTO.<ProductSummaryDTO>builder()
                .content(products)
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
    @Transactional(readOnly = true)
    public PageResponseDTO<ProductSummaryDTO> getProductsByCategory(
            Long categoryId,
            int page,
            int size
    ) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Categoría no encontrada")
                );

        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productsPage =
                productRepository.findByActiveTrueAndCategory(category, pageable);

        List<ProductSummaryDTO> products = productsPage.getContent()
                .stream()
                .map(this::convertToProductSummaryDTO)
                .toList();

        return PageResponseDTO.<ProductSummaryDTO>builder()
                .content(products)
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
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Producto no encontrado"
                        )
                );

        product.setActive(false);

        productRepository.save(product);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductSummaryDTO>
    getFeaturedProducts() {

        return productRepository.findFeaturedProducts()
                .stream()
                .map(this::convertToProductSummaryDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductSummaryDTO>
    getNewArrivals() {

        return productRepository.findNewArrivals()
                .stream()
                .map(this::convertToProductSummaryDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductSummaryDTO>
    getBestSellers() {

        return productRepository.findBestSellers()
                .stream()
                .map(this::convertToProductSummaryDTO)
                .toList();
    }

    // =========================================================
    // CATEGORÍAS
    // =========================================================

    @Override
    public CategoryDTO createCategory(
            CreateCategoryDTO createCategoryDTO
    ) {

        CategoryType categoryType =
                categoryTypeRepository.findById(
                                createCategoryDTO
                                        .getCategoryTypeId()
                        )
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Tipo de categoría no encontrado"
                                )
                        );

        Category category = Category.builder()
                .name(createCategoryDTO.getName())
                .categoryType(categoryType)
                .build();

        Category savedCategory =
                categoryRepository.save(category);

        return convertToCategoryDTO(savedCategory);
    }

    @Override
    public CategoryDTO updateCategory(
            Long id,
            UpdateCategoryDTO updateCategoryDTO
    ) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Categoría no encontrada"
                        )
                );

        if (updateCategoryDTO.getName() != null) {
            category.setName(
                    updateCategoryDTO.getName()
            );
        }

        if (updateCategoryDTO.getCategoryTypeId() != null) {

            CategoryType categoryType =
                    categoryTypeRepository.findById(
                                    updateCategoryDTO
                                            .getCategoryTypeId()
                            )
                            .orElseThrow(() ->
                                    new EntityNotFoundException(
                                            "Tipo de categoría no encontrado"
                                    )
                            );

            category.setCategoryType(categoryType);
        }

        Category updatedCategory =
                categoryRepository.save(category);

        return convertToCategoryDTO(updatedCategory);
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryDTO getCategoryById(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Categoría no encontrada"
                        )
                );

        return convertToCategoryDTO(category);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategorySummaryDTO> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(category ->
                        CategorySummaryDTO.builder()
                                .id(category.getId())
                                .name(category.getName())
                                .slug(category.getSlug())        // <-- agregar
                                .categoryTypeName(
                                        category.getCategoryType().getName()
                                )
                                .build()
                )
                .toList();
    }

    @Override
    public void deleteCategory(Long id) {

        if (!categoryRepository.existsById(id)) {

            throw new EntityNotFoundException(
                    "Categoría no encontrada"
            );
        }

        categoryRepository.deleteById(id);
    }

    // =========================================================
    // TIPOS DE CATEGORÍA
    // =========================================================

    @Override
    public CategoryTypeDTO createCategoryType(
            CreateCategoryTypeDTO createCategoryTypeDTO
    ) {

        CategoryType categoryType =
                CategoryType.builder()
                        .name(
                                createCategoryTypeDTO.getName()
                        )
                        .build();

        CategoryType savedCategoryType =
                categoryTypeRepository.save(categoryType);

        return convertToCategoryTypeDTO(
                savedCategoryType
        );
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryTypeDTO getCategoryTypeById(
            Long id
    ) {

        CategoryType categoryType =
                categoryTypeRepository.findById(id)
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Tipo de categoría no encontrado"
                                )
                        );

        return convertToCategoryTypeDTO(
                categoryType
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryTypeBasicDTO>
    getAllCategoryTypes() {

        return categoryTypeRepository.findAll()
                .stream()
                .map(categoryType ->
                        CategoryTypeBasicDTO.builder()
                                .id(categoryType.getId())
                                .name(categoryType.getName())
                                .build()
                )
                .toList();
    }

    @Override
    public void deleteCategoryType(Long id) {

        if (!categoryTypeRepository.existsById(id)) {

            throw new EntityNotFoundException(
                    "Tipo de categoría no encontrado"
            );
        }

        categoryTypeRepository.deleteById(id);
    }

    // =========================================================
    // CONVERTERS
    // =========================================================

    private ProductDTO convertToProductDTO(
            Product product
    ) {

        return ProductDTO.builder()

                .id(product.getId())

                .name(product.getName())

                .description(product.getDescription())

                .price(product.getPrice())

                .stock(product.getStock())

                .discountPrice(
                        product.getDiscountPrice()
                )

                .effectivePrice(
                        product.getEffectivePrice()
                )

                .brand(product.getBrand())

                .imageUrl(product.getImageUrl())

                .hasVariations(
                        product.getHasVariations()
                )

                .hasDiscount(
                        product.hasDiscount()
                )

                .category(
                        CategorySummaryDTO.builder()
                                .id(product.getCategory().getId())
                                .name(product.getCategory().getName())
                                .categoryTypeName(
                                        product.getCategory()
                                                .getCategoryType()
                                                .getName()
                                )
                                .build()
                )

                .build();
    }

    private ProductSummaryDTO
    convertToProductSummaryDTO(
            Product product
    ) {

        return ProductSummaryDTO.builder()

                .id(product.getId())

                .name(product.getName())

                .price(product.getPrice())

                .stock(product.getStock())

                .discountPrice(
                        product.getDiscountPrice()
                )

                .effectivePrice(
                        product.getEffectivePrice()
                )

                .hasDiscount(
                        product.hasDiscount()
                )

                .brand(product.getBrand())

                .imageUrl(
                        product.getImageUrl()
                )

                .categoryName(
                        product.getCategory().getName()
                )

                .build();
    }

    private ProductDetailDTO convertToProductDetailDTO(Product product) {
        return ProductDetailDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .effectivePrice(product.getEffectivePrice())
                .hasDiscount(product.hasDiscount())
                .brand(product.getBrand())
                .stock(product.getStock())
                .mainImageUrl(product.getImageUrl())
                .galleryImages(
                        product.getImageUrl() != null
                                ? List.of(product.getImageUrl())
                                : new ArrayList<>()
                )
                .hasVariations(product.getHasVariations())
                .category(
                        CategorySummaryDTO.builder()
                                .id(product.getCategory().getId())
                                .name(product.getCategory().getName())
                                .categoryTypeName(
                                        product.getCategory().getCategoryType().getName()
                                )
                                .build()
                )
                .build();
    }

    private CategoryDTO convertToCategoryDTO(Category category) {
        return CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())                        // <-- agregar
                .categoryType(
                        CategoryTypeDTO.builder()
                                .id(category.getCategoryType().getId())
                                .name(category.getCategoryType().getName())
                                .build()
                )
                .productCount(category.getProducts().size())
                .build();
    }

    private CategoryTypeDTO
    convertToCategoryTypeDTO(
            CategoryType categoryType
    ) {

        return CategoryTypeDTO.builder()

                .id(categoryType.getId())

                .name(categoryType.getName())

                .build();
    }
}