import { useQuery } from '@tanstack/react-query';
import { adminSalesService } from '@/services/adminSales.service';

export function useSalesStats() {
  return useQuery({
    queryKey: ['admin', 'sales-stats'],
    queryFn: adminSalesService.getSalesStats,
  });
}
