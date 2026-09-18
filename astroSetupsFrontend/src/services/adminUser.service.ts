import { apiClient } from '@/api/client';
import type {
  UserAdmin,
  UserAdminProfile,
  CustomerStats,
  PageResponse,
} from '@/interfaces/admin/admin.types';

interface UserSearchFilters {
  searchTerm?: string;
  role?: string;
  status?: string;
  page?: number;
  size?: number;
}

export const adminUserService = {
  async searchUsers(
    filters: UserSearchFilters
  ): Promise<PageResponse<UserAdmin>> {
    const response = await apiClient.post<PageResponse<UserAdmin>>(
      '/customers/_search',
      {
        searchTerm: filters.searchTerm || null,
        role: filters.role || null,
        status: filters.status || null,
        page: filters.page ?? 0,
        size: filters.size ?? 20,
      }
    );
    return response.data;
  },

  async getUserById(id: number): Promise<UserAdmin> {
    const response = await apiClient.get<UserAdmin>(`/customers/${id}`);
    return response.data;
  },

  async getUserProfile(id: number): Promise<UserAdminProfile> {
    const response = await apiClient.get<UserAdminProfile>(
      `/customers/${id}/profile`
    );
    return response.data;
  },

  async getCustomerStats(): Promise<CustomerStats> {
    const response = await apiClient.get<CustomerStats>('/customers/stats');
    return response.data;
  },
};
