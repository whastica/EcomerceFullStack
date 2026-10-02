import {
  BarChart3,
  DollarSign,
  ShoppingCart,
  Users,
  Tag,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useSalesStats, useSalesSeries } from '@/hooks/admin/useSalesStats';
import { useCustomerStats } from '@/hooks/admin/useCustomerStats';
import { usePromoStats } from '@/hooks/admin/useAdminPromotions';
import StatusBadge from '@/components/ui/admin/StatusBadge';
import type { OrderStatus } from '@/interfaces/admin/admin.types';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value);
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'Pendiente',
  IN_PREPARATION: 'En preparación',
  SHIPPED: 'Enviado',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado',
};

export default function AdminReportsPage() {
  const { data: sales } = useSalesStats();
  const { data: customers } = useCustomerStats();
  const { data: promos } = usePromoStats();
  const { data: series30 } = useSalesSeries('30d');

  const statusRows: { status: OrderStatus; count: number }[] = [
    { status: 'PENDING', count: sales?.ordersPending ?? 0 },
    { status: 'SHIPPED', count: sales?.ordersShipped ?? 0 },
    { status: 'DELIVERED', count: sales?.ordersDelivered ?? 0 },
    { status: 'CANCELLED', count: sales?.ordersCancelled ?? 0 },
  ];

  const maxStatusCount = Math.max(...statusRows.map((r) => r.count), 1);

  const chartData =
    series30?.points.map((point) => ({
      day: point.label,
      ventas: point.revenue,
    })) ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-bold text-white">Reportes</h1>
        <p className="text-[13px] text-dark-dim mt-1">
          Resumen general del rendimiento de la tienda.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="admin-kpi">
          <div className="flex items-center gap-3">
            <div className="admin-kpi-icon bg-[rgba(214,255,60,0.08)]">
              <DollarSign size={18} className="text-lime" />
            </div>
            <div>
              <div className="admin-kpi-value">
                {formatCurrency(sales?.totalRevenue ?? 0)}
              </div>
              <div className="admin-kpi-label">Ingresos entregados</div>
            </div>
          </div>
        </div>
        <div className="admin-kpi">
          <div className="flex items-center gap-3">
            <div className="admin-kpi-icon bg-blue-400/[0.08]">
              <ShoppingCart size={18} className="text-blue-400" />
            </div>
            <div>
              <div className="admin-kpi-value">{sales?.totalOrders ?? 0}</div>
              <div className="admin-kpi-label">Pedidos totales</div>
            </div>
          </div>
        </div>
        <div className="admin-kpi">
          <div className="flex items-center gap-3">
            <div className="admin-kpi-icon bg-brand/[0.08]">
              <Users size={18} className="text-brand" />
            </div>
            <div>
              <div className="admin-kpi-value">
                {customers?.totalCustomers ?? 0}
              </div>
              <div className="admin-kpi-label">Clientes</div>
            </div>
          </div>
        </div>
        <div className="admin-kpi">
          <div className="flex items-center gap-3">
            <div className="admin-kpi-icon bg-[rgba(168,85,247,0.08)]">
              <Tag size={18} className="text-brand" />
            </div>
            <div>
              <div className="admin-kpi-value">
                {promos?.totalApplications ?? 0}
              </div>
              <div className="admin-kpi-label">Códigos aplicados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue last 30 days */}
        <div className="admin-card lg:col-span-2">
          <div className="admin-card-header">
            <div>
              <div className="admin-card-title">Ingresos últimos 30 días</div>
              <div className="admin-card-subtitle">
                Ventas día a día (todas las órdenes)
              </div>
            </div>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-dark-surface)" />
                <XAxis
                  dataKey="day"
                  stroke="var(--color-dark-border)"
                  tick={{ fill: 'var(--color-dark-dim)', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  interval={Math.max(Math.floor(chartData.length / 8), 0)}
                />
                <YAxis
                  stroke="var(--color-dark-border)"
                  tick={{ fill: 'var(--color-dark-dim)', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{
                    background: 'var(--color-dark-raised)',
                    border: '1px solid var(--color-dark-surface)',
                    borderRadius: '10px',
                    color: 'var(--color-white)',
                    fontSize: 13,
                  }}
                  formatter={(value) => [formatCurrency(Number(value)), 'Ventas']}
                />
                <Bar
                  dataKey="ventas"
                  fill="var(--color-lime)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders by status */}
        <div className="admin-card">
          <div className="admin-card-title mb-5">Pedidos por estado</div>
          <div className="space-y-4">
            {statusRows.map((row) => (
              <div key={row.status}>
                <div className="flex items-center justify-between mb-1.5">
                  <StatusBadge status={row.status} />
                  <span className="text-[13px] font-semibold text-white">
                    {row.count}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-dark-sunken overflow-hidden">
                  <div
                    className="h-full rounded-full bg-brand transition-all"
                    style={{
                      width: `${(row.count / maxStatusCount) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-[11px] text-dark-faint mt-1">
                  {STATUS_LABELS[row.status]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Promo usage */}
        <div className="admin-table-wrap">
          <div className="p-5 pb-0">
            <div className="admin-card-title">Códigos más usados</div>
            <div className="admin-card-subtitle mt-0.5">
              Top de promociones por aplicaciones
            </div>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Código</th>
                <th>Descuento</th>
                <th>Usos</th>
              </tr>
            </thead>
            <tbody>
              {promos?.topUsedCodes?.length ? (
                promos.topUsedCodes.map((promo, index) => (
                  <tr key={promo.code}>
                    <td className="text-dark-dim font-medium">{index + 1}</td>
                    <td className="font-mono font-semibold text-white">
                      {promo.code}
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-success">
                        {promo.discountValue}%
                      </span>
                    </td>
                    <td className="text-white font-medium">{promo.timesUsed}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-dark-dim">
                    Aún no hay códigos usados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Customers summary */}
        <div className="admin-card">
          <div className="admin-card-title mb-5">Resumen de clientes</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-lg bg-dark-sunken border border-dark-surface">
              <p className="text-[11px] text-dark-dim uppercase tracking-wider mb-1">
                Verificados
              </p>
              <p className="text-[20px] font-bold text-lime">
                {customers?.verifiedCustomers ?? 0}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-dark-sunken border border-dark-surface">
              <p className="text-[11px] text-dark-dim uppercase tracking-wider mb-1">
                Sin verificar
              </p>
              <p className="text-[20px] font-bold text-white">
                {customers?.unverifiedCustomers ?? 0}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-dark-sunken border border-dark-surface">
              <p className="text-[11px] text-dark-dim uppercase tracking-wider mb-1">
                Nuevos este mes
              </p>
              <p className="text-[20px] font-bold text-white">
                {customers?.newCustomersThisMonth ?? 0}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-dark-sunken border border-dark-surface">
              <p className="text-[11px] text-dark-dim uppercase tracking-wider mb-1">
                Pedidos por cliente
              </p>
              <p className="text-[20px] font-bold text-white">
                {(customers?.avgOrdersPerCustomer ?? 0).toFixed(1)}
              </p>
            </div>
          </div>

          <div className="h-px bg-dark-surface my-5" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand/[0.08] flex items-center justify-center">
              <BarChart3 size={17} className="text-brand" />
            </div>
            <div>
              <p className="text-[13px] text-white font-medium">
                {formatCurrency(promos?.totalDiscountGiven ?? 0)} en descuentos
              </p>
              <p className="text-[11px] text-dark-dim">
                {promos?.totalUniqueCodesUsed ?? 0} códigos distintos usados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
