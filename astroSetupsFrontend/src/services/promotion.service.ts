import { apiClient } from '@/api/client';
import type {
  PageResponse,
  PromoCodeSummary,
  PromoCodeStats,
  PromoSearchFilters,
  PromoCreateRequest,
  PromoUpdateRequest,
} from '@/interfaces/admin/admin.types';

export const promotionService = {
  async searchPromos(
    filters: PromoSearchFilters
  ): Promise<PageResponse<PromoCodeSummary>> {
    const response = await apiClient.post<PageResponse<PromoCodeSummary>>(
      '/promotions/codes/search',
      {
        searchTerm: filters.searchTerm || null,
        active: filters.active ?? null,
        expired: filters.expired ?? null,
        page: filters.page ?? 0,
        size: filters.size ?? 20,
      }
    );
    return response.data;
  },

  async getPromoStats(): Promise<PromoCodeStats> {
    const response = await apiClient.get<PromoCodeStats>(
      '/promotions/codes/stats'
    );
    return response.data;
  },

  async createPromo(data: PromoCreateRequest): Promise<unknown> {
    const response = await apiClient.post('/promotions/codes', data);
    return response.data;
  },

  async updatePromo(
    code: string,
    data: PromoUpdateRequest
  ): Promise<unknown> {
    const response = await apiClient.put(
      `/promotions/codes/${encodeURIComponent(code)}`,
      data
    );
    return response.data;
  },

  async deletePromo(code: string): Promise<void> {
    await apiClient.delete(
      `/promotions/codes/${encodeURIComponent(code)}`
    );
  },
};
