import { useQuery } from '@tanstack/react-query';
import { adminUserService } from '@/services/adminUser.service';

export function useCustomerStats() {
  return useQuery({
    queryKey: ['admin', 'customer-stats'],
    queryFn: adminUserService.getCustomerStats,
  });
}
