import { useQuery } from '@tanstack/react-query';
import { adminSalesService } from '@/services/adminSales.service';

export function useSalesStats() {
  return useQuery({
    queryKey: ['admin', 'sales-stats'],
    queryFn: adminSalesService.getSalesStats,
  });
}

export function useSalesSeries(period: '7d' | '30d' | '90d') {
  return useQuery({
    queryKey: ['admin', 'sales-series', period],
    queryFn: () => adminSalesService.getSalesSeries(period),
  });
}
