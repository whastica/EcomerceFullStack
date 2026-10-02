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
    className: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    dotColor: 'bg-cyan-400',
  },
  DELIVERED: {
    label: 'Entregado',
    className: 'bg-lime/10 text-lime border-lime/20',
    dotColor: 'bg-lime',
  },
  CANCELLED: {
    label: 'Cancelado',
    className: 'bg-red-500/10 text-red-400 border-red-500/20',
    dotColor: 'bg-red-400',
  },
  ACTIVE: {
    label: 'Activo',
    className: 'bg-lime/10 text-lime border-lime/20',
    dotColor: 'bg-lime',
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
    className: 'bg-brand/10 text-brand border-brand/20',
    dotColor: 'bg-brand',
  },
  SUPER_ADMIN: {
    label: 'Super Admin',
    className: 'bg-brand/10 text-brand border-brand/20',
    dotColor: 'bg-brand',
  },
  CLIENT: {
    label: 'Cliente',
    className: 'bg-info/10 text-info border-info/20',
    dotColor: 'bg-info',
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
