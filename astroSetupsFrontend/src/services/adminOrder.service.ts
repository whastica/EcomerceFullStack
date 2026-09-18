import { apiClient } from '@/api/client';
import type {
  OrderSearchResult,
  OrderDetail,
  OrderStatus,
} from '@/interfaces/admin/admin.types';

interface OrderSearchFilters {
  searchTerm?: string;
  status?: OrderStatus;
  page?: number;
  size?: number;
}

export const adminOrderService = {
  async searchOrders(
    filters: OrderSearchFilters
  ): Promise<OrderSearchResult> {
    const response = await apiClient.post<OrderSearchResult>(
      '/sales/orders/search',
      {
        searchTerm: filters.searchTerm || null,
        status: filters.status || null,
        page: filters.page ?? 0,
        size: filters.size ?? 20,
      }
    );
    return response.data;
  },

  async getOrderById(id: number): Promise<OrderDetail> {
    const response = await apiClient.get<OrderDetail>(`/sales/orders/${id}`);
    return response.data;
  },

  async updateOrderStatus(
    id: number,
    status: OrderStatus,
    observation?: string
  ): Promise<OrderDetail> {
    const response = await apiClient.put<OrderDetail>(
      `/sales/orders/${id}/status`,
      { status, observation }
    );
    return response.data;
  },
};
