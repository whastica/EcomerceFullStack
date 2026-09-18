import { apiClient } from '@/api/client';
import type {
  PageResponse,
  ProductSummary,
  ProductDetail,
  CategorySummary,
} from '@/interfaces/admin/admin.types';
import type { ProductSearchRequest } from '@/interfaces/product/product-search-request.interface';

export const adminProductService = {
  async getProducts(
    page = 0,
    size = 10
  ): Promise<PageResponse<ProductSummary>> {
    const response = await apiClient.get<PageResponse<ProductSummary>>(
      '/catalog/products',
      { params: { page, size } }
    );
    return response.data;
  },

  async searchProducts(
    filters: ProductSearchRequest
  ): Promise<PageResponse<ProductSummary>> {
    const response = await apiClient.post<PageResponse<ProductSummary>>(
      '/catalog/products/_search',
      filters
    );
    return response.data;
  },

  async getProductById(id: number): Promise<ProductDetail> {
    const response = await apiClient.get<ProductDetail>(
      `/catalog/products/${id}`
    );
    return response.data;
  },

  async createProduct(
    data: Record<string, unknown>
  ): Promise<ProductDetail> {
    const response = await apiClient.post<ProductDetail>(
      '/catalog/products',
      data
    );
    return response.data;
  },

  async updateProduct(
    id: number,
    data: Partial<ProductDetail>
  ): Promise<ProductDetail> {
    const response = await apiClient.put<ProductDetail>(
      `/catalog/products/${id}`,
      data
    );
    return response.data;
  },

  async getCategories(): Promise<CategorySummary[]> {
    const response = await apiClient.get<CategorySummary[]>(
      '/catalog/categories'
    );
    return response.data;
  },

  async getBestSellers(): Promise<ProductSummary[]> {
    const response = await apiClient.get<ProductSummary[]>(
      '/catalog/products/best-sellers'
    );
    return response.data;
  },
};
