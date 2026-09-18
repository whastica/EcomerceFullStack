import { apiClient } from '@/api/client';
import type { SalesStats } from '@/interfaces/admin/admin.types';

export const adminSalesService = {
  async getSalesStats(): Promise<SalesStats> {
    const response = await apiClient.get<SalesStats>('/sales/stats');
    return response.data;
  },
};
