import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminUserService } from '@/services/adminUser.service';
import { toast } from 'sonner';

export interface UserSearchFilters {
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

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      adminUserService.updateUser(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'customer-stats'] });
      toast.success('Estado del cliente actualizado');
    },
    onError: () => {
      toast.error('Error al actualizar el estado del cliente');
    },
  });
}
