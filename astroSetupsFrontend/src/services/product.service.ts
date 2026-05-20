import { apiClient } from '@/api/client';

import { ProductSearchRequest }
  from '@/interfaces/product/product-search-request.interface';

import { ProductSearchResult }
  from '@/interfaces/product/product-search-result.interface';

import { ProductSummary }
  from '@/interfaces/product/product-summary.interface';

import { ProductDetail }
  from '@/interfaces/product/product-detail.interface';

import { PaginatedResponse }
  from '@/interfaces/common/paginated-response.interface';

const BASE_URL = '/catalog/products';

export const productService = {

  /**
   * Obtener catálogo paginado
   */
  async getProducts(
    page = 0,
    size = 8
  ): Promise<
    PaginatedResponse<ProductSummary>
  > {

    const response =
      await apiClient.get<
        PaginatedResponse<ProductSummary>
      >(
        BASE_URL,
        {
          params: {
            page,
            size,
          },
        }
      );

    return response.data;
  },



  /**
   * Obtener producto por ID
   */
  async getProductById(
    id: number
  ): Promise<ProductDetail> {

    const response =
      await apiClient.get<ProductDetail>(
        `${BASE_URL}/${id}`
      );

    return response.data;
  },

  /**
   * Búsqueda avanzada con filtros
   */
  async searchProducts(
    searchRequest: ProductSearchRequest
  ): Promise<ProductSearchResult> {

    const response =
      await apiClient.post<ProductSearchResult>(
        `${BASE_URL}/_search`,
        searchRequest
      );

    return response.data;
  },

  /**
   * Obtener productos por categoría
   */
  async getProductsByCategory(
    categoryId: number,
    page = 0,
    size = 8
  ): Promise<
    PaginatedResponse<ProductSummary>
  > {

    const response =
      await apiClient.get<
        PaginatedResponse<ProductSummary>
      >(
        `${BASE_URL}/by-category`,
        {
          params: {
            categoryId,
            page,
            size,
          },
        }
      );

    return response.data;
  },



  /**
   * Productos destacados
   */
  async getFeaturedProducts():
    Promise<ProductSummary[]> {

    const response =
      await apiClient.get<
        ProductSummary[]
      >(
        `${BASE_URL}/featured`
      );

    return response.data;
  },



  /**
   * Nuevos productos
   */
  async getNewArrivals():
    Promise<ProductSummary[]> {

    const response =
      await apiClient.get<
        ProductSummary[]
      >(
        `${BASE_URL}/new-arrivals`
      );

    return response.data;
  },



  /**
   * Más vendidos
   */
  async getBestSellers():
    Promise<ProductSummary[]> {

    const response =
      await apiClient.get<
        ProductSummary[]
      >(
        `${BASE_URL}/best-sellers`
      );

    return response.data;
  },
};