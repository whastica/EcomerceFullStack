import { cn } from '@/lib/utils';
import type { OrderStatus, UserStatus } from '@/interfaces/admin/admin.types';

const statusConfig: Record<
  string,
  { label: string; className: string; dotColor: string }
> = {
  PENDING: {
    label: 'Pendiente',
    className: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    dotColor: 'bg-amber-400',
  },
  IN_PREPARATION: {
    label: 'En Preparación',
    className: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    dotColor: 'bg-blue-400',
  },
  SHIPPED: {
    label: 'Enviado',
    className: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    dotColor: 'bg-purple-400',
  },
  DELIVERED: {
    label: 'Entregado',
    className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    dotColor: 'bg-emerald-400',
  },
  CANCELLED: {
    label: 'Cancelado',
    className: 'bg-red-500/10 text-red-400 border-red-500/20',
    dotColor: 'bg-red-400',
  },
  ACTIVE: {
    label: 'Activo',
    className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    dotColor: 'bg-emerald-400',
  },
  INACTIVE: {
    label: 'Inactivo',
    className: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    dotColor: 'bg-gray-400',
  },
  SUSPENDED: {
    label: 'Suspendido',
    className: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    dotColor: 'bg-amber-400',
  },
  DELETED: {
    label: 'Eliminado',
    className: 'bg-red-500/10 text-red-400 border-red-500/20',
    dotColor: 'bg-red-400',
  },
  ADMIN: {
    label: 'Admin',
    className: 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20',
    dotColor: 'bg-[#8B5CF6]',
  },
  SUPER_ADMIN: {
    label: 'Super Admin',
    className: 'bg-[#FB5607]/10 text-[#FB5607] border-[#FB5607]/20',
    dotColor: 'bg-[#FB5607]',
  },
  CLIENT: {
    label: 'Cliente',
    className: 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20',
    dotColor: 'bg-[#3B82F6]',
  },
};

interface StatusBadgeProps {
  status: OrderStatus | UserStatus | string;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || {
    label: status,
    className: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    dotColor: 'bg-gray-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-sm',
        config.className,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dotColor)} />
      {config.label}
    </span>
  );
}
