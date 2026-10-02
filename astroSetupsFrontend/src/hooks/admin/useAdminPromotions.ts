import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { promotionService } from '@/services/promotion.service';
import type {
  PromoSearchFilters,
  PromoCreateRequest,
  PromoUpdateRequest,
} from '@/interfaces/admin/admin.types';
import { toast } from 'sonner';

export function usePromoSearch(filters: PromoSearchFilters) {
  return useQuery({
    queryKey: ['admin', 'promos', filters],
    queryFn: () => promotionService.searchPromos(filters),
  });
}

export function usePromoStats() {
  return useQuery({
    queryKey: ['admin', 'promo-stats'],
    queryFn: promotionService.getPromoStats,
  });
}

export function useCreatePromo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PromoCreateRequest) =>
      promotionService.createPromo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'promos'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'promo-stats'] });
      toast.success('Código promocional creado');
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : 'Error al crear el código';
      toast.error(message);
    },
  });
}

export function useUpdatePromo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      code,
      data,
    }: {
      code: string;
      data: PromoUpdateRequest;
    }) => promotionService.updatePromo(code, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'promos'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'promo-stats'] });
      toast.success('Código promocional actualizado');
    },
    onError: () => {
      toast.error('Error al actualizar el código');
    },
  });
}

export function useDeletePromo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => promotionService.deletePromo(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'promos'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'promo-stats'] });
      toast.success('Código promocional eliminado');
    },
    onError: () => {
      toast.error('Error al eliminar el código');
    },
  });
}
