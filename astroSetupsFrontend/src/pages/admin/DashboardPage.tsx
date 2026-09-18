import { useState } from 'react';
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowUpRight,
  Package,
  Truck,
  Star,
  Zap,
  ChevronRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useSalesStats } from '@/hooks/admin/useSalesStats';
import { useCustomerStats } from '@/hooks/admin/useCustomerStats';
import { useAdminOrders } from '@/hooks/admin/useAdminOrders';
import { useAdminBestSellers } from '@/hooks/admin/useAdminProducts';
import StatusBadge from '@/components/ui/admin/StatusBadge';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value);
}

const chartData = [
  { day: 'Lun', ventas: 1200000 },
  { day: 'Mar', ventas: 1800000 },
  { day: 'Mié', ventas: 1500000 },
  { day: 'Jue', ventas: 2200000 },
  { day: 'Vie', ventas: 1900000 },
  { day: 'Sáb', ventas: 2800000 },
  { day: 'Dom', ventas: 1100000 },
];

export default function DashboardPage() {
  const [period, setPeriod] = useState('7d');
  const { data: sales, isLoading: loadingSales } = useSalesStats();
  const { data: customers, isLoading: loadingCustomers } = useCustomerStats();
  const { data: ordersData, isLoading: loadingOrders } = useAdminOrders({ page: 0, size: 5 });
  const { data: bestSellers, isLoading: loadingBest } = useAdminBestSellers();

  const isLoading = loadingSales || loadingCustomers;

  return (
    <div className="space-y-7">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-white">
            ¡Hola, Admin! 👋
          </h1>
          <p className="text-[13px] text-[#555555] mt-1">
            Aquí tienes un resumen del rendimiento de tu tienda.
          </p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="admin-select w-auto"
        >
          <option value="7d">Últimos 7 días</option>
          <option value="30d">Últimos 30 días</option>
          <option value="90d">Últimos 90 días</option>
        </select>
      </div>

      {/* KPI Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="admin-skeleton h-[120px]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="admin-kpi">
            <div className="flex items-center justify-between">
              <div className="admin-kpi-icon bg-[rgba(52,211,153,0.08)]">
                <DollarSign size={18} className="text-[#34D399]" />
              </div>
              <span className="admin-kpi-change positive">
                <ArrowUpRight size={13} /> 18%
              </span>
            </div>
            <div className="admin-kpi-value">
              {formatCurrency(sales?.totalRevenue ?? 0)}
            </div>
            <div className="admin-kpi-label">Ventas totales</div>
          </div>

          <div className="admin-kpi">
            <div className="flex items-center justify-between">
              <div className="admin-kpi-icon bg-[rgba(96,165,250,0.08)]">
                <ShoppingCart size={18} className="text-[#60A5FA]" />
              </div>
              <span className="admin-kpi-change positive">
                <ArrowUpRight size={13} /> 24%
              </span>
            </div>
            <div className="admin-kpi-value">{sales?.totalOrders ?? 0}</div>
            <div className="admin-kpi-label">Pedidos realizados</div>
          </div>

          <div className="admin-kpi">
            <div className="flex items-center justify-between">
              <div className="admin-kpi-icon bg-[rgba(168,85,247,0.08)]">
                <Users size={18} className="text-[#A855F7]" />
              </div>
              <span className="admin-kpi-change positive">
                <ArrowUpRight size={13} /> 12%
              </span>
            </div>
            <div className="admin-kpi-value">
              {customers?.totalCustomers ?? 0}
            </div>
            <div className="admin-kpi-label">Clientes registrados</div>
          </div>

          <div className="admin-kpi">
            <div className="flex items-center justify-between">
              <div className="admin-kpi-icon bg-[rgba(251,86,7,0.08)]">
                <TrendingUp size={18} className="text-[#FB5607]" />
              </div>
              <span className="admin-kpi-change positive">
                <ArrowUpRight size={13} /> 10%
              </span>
            </div>
            <div className="admin-kpi-value">
              {formatCurrency(sales?.averageOrderValue ?? 0)}
            </div>
            <div className="admin-kpi-label">Ticket promedio</div>
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sales Evolution Chart */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div>
                <div className="admin-card-title">Evolución de ventas</div>
                <div className="admin-card-subtitle">Tendencia de los últimos 7 días</div>
              </div>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="admin-select w-auto text-[12px]"
              >
                <option value="7d">Últimos 7 días</option>
                <option value="30d">Últimos 30 días</option>
              </select>
            </div>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FB5607" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#FB5607" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" />
                  <XAxis
                    dataKey="day"
                    stroke="#333333"
                    tick={{ fill: '#555555', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#333333"
                    tick={{ fill: '#555555', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#111111',
                      border: '1px solid #1A1A1A',
                      borderRadius: '10px',
                      color: '#FFFFFF',
                      fontSize: 13,
                    }}
                    formatter={(value) => [formatCurrency(Number(value)), 'Ventas']}
                  />
                  <Area
                    type="monotone"
                    dataKey="ventas"
                    stroke="#FB5607"
                    strokeWidth={2}
                    fill="url(#colorVentas)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Best Selling Products */}
          <div className="admin-table-wrap">
            <div className="p-5 pb-0">
              <div className="admin-card-title">Productos más vendidos</div>
              <div className="admin-card-subtitle mt-0.5">Top productos por cantidad vendida</div>
            </div>
            {loadingBest ? (
              <div className="p-5 space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="admin-skeleton h-12" />
                ))}
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {bestSellers?.slice(0, 5).map((product, index) => (
                    <tr key={product.id}>
                      <td className="text-[#555555] font-medium">{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="admin-product-thumb"
                            />
                          ) : (
                            <div className="admin-product-thumb-placeholder">
                              <Package size={16} className="text-[#444444]" />
                            </div>
                          )}
                          <div>
                            <p className="text-white font-medium">{product.name}</p>
                            {product.brand && (
                              <p className="text-[11px] text-[#555555]">{product.brand}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-[#777777]">{product.categoryName}</td>
                      <td className="text-white font-medium">
                        {formatCurrency(product.effectivePrice ?? product.price)}
                      </td>
                      <td>
                        <span
                          className={
                            product.stock <= 0
                              ? 'admin-stock-out'
                              : product.stock <= 5
                              ? 'admin-stock-low'
                              : 'admin-stock-ok'
                          }
                        >
                          {product.stock}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(!bestSellers || bestSellers.length === 0) && (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-[#555555]">
                        No hay productos vendidos aún
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          {/* Recent Orders */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div className="admin-card-title">Pedidos recientes</div>
              <a
                href="/admin/orders"
                className="text-[12px] text-[#FB5607] hover:text-[#E4500A] font-medium flex items-center gap-1 transition-colors"
              >
                Ver todos <ChevronRight size={13} />
              </a>
            </div>
            {loadingOrders ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="admin-skeleton h-14" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {ordersData?.orders?.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#0E0E0E] border border-[#1A1A1A] flex items-center justify-center flex-shrink-0">
                      <ShoppingCart size={14} className="text-[#555555]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-[13px] font-medium">
                          #{order.id}
                        </span>
                        <StatusBadge status={order.status} />
                      </div>
                      <p className="text-[11px] text-[#555555] mt-0.5 truncate">
                        {order.userFullName}
                      </p>
                    </div>
                    <span className="text-[13px] text-white font-semibold whitespace-nowrap">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                ))}
                {(!ordersData?.orders || ordersData.orders.length === 0) && (
                  <p className="text-center py-6 text-[#555555] text-[13px]">
                    No hay pedidos recientes
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Store Performance */}
          <div className="admin-card">
            <div className="admin-card-title mb-5">Rendimiento de la tienda</div>
            <div className="space-y-4">
              {/* Availability */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 flex-shrink-0">
                  <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      fill="none"
                      stroke="#1A1A1A"
                      strokeWidth="4"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      fill="none"
                      stroke="#34D399"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${(sales?.ordersDelivered ?? 0) / Math.max(sales?.totalOrders ?? 1, 1) * 150.8} 150.8`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[11px] font-bold text-white">
                      {Math.round(((sales?.ordersDelivered ?? 0) / Math.max(sales?.totalOrders ?? 1, 1)) * 100)}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[13px] text-white font-medium">Tasa de entrega</p>
                  <p className="text-[11px] text-[#555555]">
                    {sales?.ordersDelivered ?? 0} de {sales?.totalOrders ?? 0} pedidos
                  </p>
                </div>
              </div>

              <div className="h-px bg-[#1A1A1A]" />

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-[#0E0E0E] border border-[#1A1A1A]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Truck size={14} className="text-[#60A5FA]" />
                    <span className="text-[11px] text-[#555555]">Envíos</span>
                  </div>
                  <p className="text-[18px] font-bold text-white">
                    {sales?.ordersShipped ?? 0}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[#0E0E0E] border border-[#1A1A1A]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Star size={14} className="text-[#FBBF24]" />
                    <span className="text-[11px] text-[#555555]">Satisfacción</span>
                  </div>
                  <p className="text-[18px] font-bold text-white">
                    {customers?.avgOrdersPerCustomer?.toFixed(1) ?? '0.0'}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[#0E0E0E] border border-[#1A1A1A]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Zap size={14} className="text-[#FB5607]" />
                    <span className="text-[11px] text-[#555555]">Pendientes</span>
                  </div>
                  <p className="text-[18px] font-bold text-white">
                    {sales?.ordersPending ?? 0}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[#0E0E0E] border border-[#1A1A1A]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Users size={14} className="text-[#A855F7]" />
                    <span className="text-[11px] text-[#555555]">Nuevos</span>
                  </div>
                  <p className="text-[18px] font-bold text-white">
                    {customers?.newCustomersThisMonth ?? 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
