import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminProductService } from '@/services/adminProduct.service';
import type { ProductSearchRequest } from '@/interfaces/product/product-search-request.interface';
import { toast } from 'sonner';

export function useAdminProducts(page: number, size: number) {
  return useQuery({
    queryKey: ['admin', 'products', page, size],
    queryFn: () => adminProductService.getProducts(page, size),
  });
}

export function useAdminProductSearch(
  filters: ProductSearchRequest,
  enabled = true
) {
  return useQuery({
    queryKey: ['admin', 'products', 'search', filters],
    queryFn: () => adminProductService.searchProducts(filters),
    enabled,
  });
}

export function useAdminProductDetail(id: number, enabled = true) {
  return useQuery({
    queryKey: ['admin', 'product', id],
    queryFn: () => adminProductService.getProductById(id),
    enabled,
  });
}

export function useAdminCategories() {
  return useQuery({
    queryKey: ['admin', 'categories'],
    queryFn: adminProductService.getCategories,
  });
}

export function useAdminBestSellers() {
  return useQuery({
    queryKey: ['admin', 'best-sellers'],
    queryFn: adminProductService.getBestSellers,
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => adminProductService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      toast.success('Producto desactivado');
    },
    onError: () => {
      toast.error('Error al desactivar el producto');
    },
  });
}

export function useToggleProductActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, active }: { id: number; active: boolean }) =>
      adminProductService.updateProduct(id, { active }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      toast.success(
        variables.active
          ? 'Producto activado'
          : 'Producto desactivado'
      );
    },
    onError: () => {
      toast.error('Error al actualizar el estado del producto');
    },
  });
}
