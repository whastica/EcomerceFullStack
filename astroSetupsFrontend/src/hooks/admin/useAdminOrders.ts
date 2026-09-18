import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminOrderService } from '@/services/adminOrder.service';
import type { OrderStatus } from '@/interfaces/admin/admin.types';
import { toast } from 'sonner';

interface OrderSearchFilters {
  searchTerm?: string;
  status?: OrderStatus;
  page?: number;
  size?: number;
}

export function useAdminOrders(filters: OrderSearchFilters) {
  return useQuery({
    queryKey: ['admin', 'orders', filters],
    queryFn: () => adminOrderService.searchOrders(filters),
  });
}

export function useAdminOrderDetail(id: number, enabled = true) {
  return useQuery({
    queryKey: ['admin', 'order', id],
    queryFn: () => adminOrderService.getOrderById(id),
    enabled,
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      observation,
    }: {
      id: number;
      status: OrderStatus;
      observation?: string;
    }) => adminOrderService.updateOrderStatus(id, status, observation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      toast.success('Estado de orden actualizado');
    },
    onError: () => {
      toast.error('Error al actualizar el estado');
    },
  });
}
