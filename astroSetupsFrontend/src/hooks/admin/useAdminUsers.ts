import { useQuery } from '@tanstack/react-query';
import { adminUserService } from '@/services/adminUser.service';

interface UserSearchFilters {
  searchTerm?: string;
  role?: string;
  status?: string;
  page?: number;
  size?: number;
}

export function useAdminUsers(filters: UserSearchFilters) {
  return useQuery({
    queryKey: ['admin', 'users', filters],
    queryFn: () => adminUserService.searchUsers(filters),
  });
}

export function useAdminUserProfile(id: number, enabled = true) {
  return useQuery({
    queryKey: ['admin', 'user-profile', id],
    queryFn: () => adminUserService.getUserProfile(id),
    enabled,
  });
}
