import { apiClient } from '@/api/client';
import type { SalesStats, SalesSeries } from '@/interfaces/admin/admin.types';

export const adminSalesService = {
  async getSalesStats(): Promise<SalesStats> {
    const response = await apiClient.get<SalesStats>('/sales/stats');
    return response.data;
  },

  async getSalesSeries(period: '7d' | '30d' | '90d'): Promise<SalesSeries> {
    const response = await apiClient.get<SalesSeries>(
      `/sales/stats/series?period=${period}`
    );
    return response.data;
  },
};
