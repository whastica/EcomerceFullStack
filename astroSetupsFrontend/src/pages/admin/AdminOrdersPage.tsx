import { useState } from 'react';
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Modal from '@/components/ui/admin/Modal';
import StatusBadge from '@/components/ui/admin/StatusBadge';
import { useAdminOrders, useUpdateOrderStatus } from '@/hooks/admin/useAdminOrders';
import { adminOrderService } from '@/services/adminOrder.service';
import type { OrderSummary, OrderDetail, OrderStatus } from '@/interfaces/admin/admin.types';

const ORDER_STATUSES: { value: OrderStatus; label: string }[] = [
  { value: 'PENDING', label: 'Pendiente' },
  { value: 'IN_PREPARATION', label: 'En Preparación' },
  { value: 'SHIPPED', label: 'Enviado' },
  { value: 'DELIVERED', label: 'Entregado' },
  { value: 'CANCELLED', label: 'Cancelado' },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value);
}

export default function AdminOrdersPage() {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');
  const [detailModal, setDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [statusModal, setStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderStatus>('PENDING');
  const [observation, setObservation] = useState('');

  const { data, isLoading } = useAdminOrders({
    searchTerm: searchTerm || undefined,
    status: (statusFilter as OrderStatus) || undefined,
    page,
    size: 10,
  });

  const updateStatus = useUpdateOrderStatus();

  const orders = data?.orders ?? [];
  const totalElements = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;

  async function handleViewDetail(orderId: number) {
    try {
      const detail = await adminOrderService.getOrderById(orderId);
      setSelectedOrder(detail);
      setDetailModal(true);
    } catch {
      // Error silently handled
    }
  }

  function handleStatusChange(order: OrderSummary | OrderDetail) {
    setSelectedOrder(null);
    setDetailModal(false);
    setNewStatus(order.status);
    setObservation('');
    setStatusModal(true);
  }

  function handleConfirmStatusChange() {
    if (!selectedOrder) return;
    updateStatus.mutate(
      { id: selectedOrder.id, status: newStatus, observation: observation || undefined },
      { onSuccess: () => { setStatusModal(false); setSelectedOrder(null); } }
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-white">Pedidos</h1>
          <p className="text-[13px] text-[#555555] mt-1">
            Gestiona los pedidos de tu tienda.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444444]" />
          <input
            type="text"
            placeholder="Buscar por cliente..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
            className="admin-input pl-10"
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444444] pointer-events-none" />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value as OrderStatus | ''); setPage(0); }}
            className="admin-select pl-10"
          >
            <option value="">Todos los estados</option>
            {ORDER_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="admin-skeleton h-14" />
          ))}
        </div>
      ) : orders.length > 0 ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-16">ID</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Pago</th>
                <th>Fecha</th>
                <th className="w-16"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="font-mono text-[#555555]">#{order.id}</td>
                  <td>
                    <p className="text-white font-medium">{order.userFullName}</p>
                    <p className="text-[11px] text-[#555555]">
                      {order.totalItems} producto{order.totalItems !== 1 ? 's' : ''}
                    </p>
                  </td>
                  <td className="text-[#777777]">
                    {order.summaryDescription || order.firstProductName}
                  </td>
                  <td className="text-white font-semibold">{formatCurrency(order.total)}</td>
                  <td><StatusBadge status={order.status} /></td>
                  <td className="text-[#777777] text-[12px]">
                    {order.paymentMethod === 'CASH_ON_DELIVERY'
                      ? 'Contra entrega'
                      : order.paymentMethod === 'BANK_TRANSFER'
                      ? 'Transferencia'
                      : 'Crédito'}
                  </td>
                  <td className="text-[#555555] text-[12px]">
                    {new Date(order.orderDate).toLocaleDateString('es-CO')}
                  </td>
                  <td>
                    <button
                      onClick={() => handleViewDetail(order.id)}
                      className="p-2 rounded-lg text-[#555555] hover:text-[#60A5FA] hover:bg-[rgba(96,165,250,0.08)] transition-all"
                    >
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="admin-pagination">
            <div className="admin-pagination-info">
              Mostrando {page * 10 + 1}–{Math.min((page + 1) * 10, totalElements)} de{' '}
              {totalElements} pedidos
            </div>
            <div className="admin-pagination-buttons">
              <button
                className="admin-pagination-btn"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeft size={16} />
              </button>
              {[...Array(totalPages)].slice(0, 5).map((_, i) => (
                <button
                  key={i}
                  className={`admin-pagination-btn ${page === i ? 'active' : ''}`}
                  onClick={() => setPage(i)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="admin-pagination-btn"
                disabled={page >= totalPages - 1}
                onClick={() => setPage(page + 1)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="admin-card text-center py-12">
          <ShoppingCart size={40} className="mx-auto text-[#333333] mb-3" />
          <p className="text-[15px] text-[#555555] font-medium">No hay pedidos</p>
          <p className="text-[13px] text-[#444444] mt-1">
            Los pedidos aparecerán aquí cuando los clientes realicen compras.
          </p>
        </div>
      )}

      {/* Detail Modal */}
      <Modal
        isOpen={detailModal}
        onClose={() => { setDetailModal(false); setSelectedOrder(null); }}
        title={`Pedido #${selectedOrder?.id}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-[#0E0E0E] border border-[#1A1A1A]">
                <p className="text-[11px] text-[#555555] uppercase tracking-wider mb-1">Cliente</p>
                <p className="text-[13px] font-semibold text-white">
                  {selectedOrder.userFullName || selectedOrder.guestUser?.fullName}
                </p>
                <p className="text-[11px] text-[#555555]">
                  {selectedOrder.userEmail || selectedOrder.guestUser?.email}
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-[#0E0E0E] border border-[#1A1A1A]">
                <p className="text-[11px] text-[#555555] uppercase tracking-wider mb-1">Estado</p>
                <StatusBadge status={selectedOrder.status} />
              </div>
              <div className="p-3.5 rounded-lg bg-[#0E0E0E] border border-[#1A1A1A]">
                <p className="text-[11px] text-[#555555] uppercase tracking-wider mb-1">Método de Pago</p>
                <p className="text-[13px] text-white">
                  {selectedOrder.paymentMethod === 'CASH_ON_DELIVERY'
                    ? 'Contra entrega'
                    : selectedOrder.paymentMethod === 'BANK_TRANSFER'
                    ? 'Transferencia'
                    : 'Tarjeta de Crédito'}
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-[#0E0E0E] border border-[#1A1A1A]">
                <p className="text-[11px] text-[#555555] uppercase tracking-wider mb-1">Total</p>
                <p className="text-[13px] text-white font-bold">
                  {formatCurrency(selectedOrder.total)}
                </p>
              </div>
            </div>

            {/* Items */}
            <div>
              <p className="text-[11px] text-[#555555] uppercase tracking-wider mb-2.5">Productos</p>
              <div className="space-y-2">
                {selectedOrder.orderItems?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#0E0E0E] border border-[#1A1A1A] hover:border-[#252525] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {item.productImageUrl ? (
                        <img
                          src={item.productImageUrl}
                          alt={item.productName}
                          className="w-10 h-10 rounded-lg object-cover border border-[#1A1A1A]"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#0E0E0E] border border-[#1A1A1A] flex items-center justify-center">
                          <ShoppingCart size={14} className="text-[#444444]" />
                        </div>
                      )}
                      <div>
                        <p className="text-[13px] font-semibold text-white">{item.productName}</p>
                        <p className="text-[11px] text-[#555555]">x{item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-[13px] font-bold text-white">
                      {formatCurrency(item.finalSubtotal)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-[#1A1A1A]" />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setDetailModal(false); setSelectedOrder(null); }}
                className="admin-btn-secondary"
              >
                Cerrar
              </button>
              <button
                onClick={() => handleStatusChange(selectedOrder)}
                className="admin-btn-primary"
              >
                Cambiar Estado
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Status Change Modal */}
      <Modal
        isOpen={statusModal}
        onClose={() => setStatusModal(false)}
        title="Cambiar Estado"
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-[#555555] uppercase tracking-wider mb-1.5">
              Nuevo Estado
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
              className="w-full admin-select"
            >
              {ORDER_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#555555] uppercase tracking-wider mb-1.5">
              Observación (opcional)
            </label>
            <textarea
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              rows={3}
              className="w-full admin-input resize-none"
              placeholder="Motivo del cambio de estado..."
            />
          </div>
          <div className="h-px bg-[#1A1A1A]" />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setStatusModal(false)}
              className="admin-btn-secondary"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmStatusChange}
              disabled={updateStatus.isPending}
              className="admin-btn-primary disabled:opacity-50"
            >
              {updateStatus.isPending ? 'Actualizando...' : 'Confirmar'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
