import { useQuery } from '@tanstack/react-query';
import { adminProductService } from '@/services/adminProduct.service';
import type { ProductSearchRequest } from '@/interfaces/product/product-search-request.interface';

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
