import { useState } from 'react';
import {
  Tag,
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Modal from '@/components/ui/admin/Modal';
import {
  usePromoSearch,
  usePromoStats,
  useCreatePromo,
  useUpdatePromo,
  useDeletePromo,
} from '@/hooks/admin/useAdminPromotions';
import type {
  PromoCodeSummary,
  PromoSearchFilters,
} from '@/interfaces/admin/admin.types';

type StatusFilter = '' | 'active' | 'inactive' | 'expired';

interface PromoForm {
  code: string;
  discountValue: string;
  expirationDate: string;
  remainingUses: string;
  onlyForDiscountedProducts: boolean;
  active: boolean;
}

const emptyForm: PromoForm = {
  code: '',
  discountValue: '10',
  expirationDate: '',
  remainingUses: '',
  onlyForDiscountedProducts: false,
  active: true,
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string | null) {
  if (!value) return 'Sin expiración';
  return new Date(value).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function promoStatus(promo: PromoCodeSummary) {
  if (promo.expired) return { label: 'Caducado', className: 'admin-badge-danger' };
  if (!promo.active) return { label: 'Inactivo', className: 'admin-badge-neutral' };
  return { label: 'Activo', className: 'admin-badge-success' };
}

export default function AdminPromotionsPage() {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('');
  const [formModal, setFormModal] = useState(false);
  const [editing, setEditing] = useState<PromoCodeSummary | null>(null);
  const [form, setForm] = useState<PromoForm>(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<PromoCodeSummary | null>(null);

  const filters: PromoSearchFilters = {
    searchTerm: searchTerm || undefined,
    active: statusFilter === 'active' ? true : statusFilter === 'inactive' ? false : undefined,
    expired: statusFilter === 'expired' ? true : undefined,
    page,
    size: 10,
  };

  const { data, isLoading } = usePromoSearch(filters);
  const { data: stats } = usePromoStats();
  const createPromo = useCreatePromo();
  const updatePromo = useUpdatePromo();
  const deletePromo = useDeletePromo();

  const promos = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setFormModal(true);
  }

  function openEdit(promo: PromoCodeSummary) {
    setEditing(promo);
    setForm({
      code: promo.code,
      discountValue: String(promo.discountValue),
      expirationDate: promo.expirationDate
        ? promo.expirationDate.slice(0, 16)
        : '',
      remainingUses: '',
      onlyForDiscountedProducts: false,
      active: promo.active,
    });
    setFormModal(true);
  }

  function handleSubmit() {
    const discountValue = Number(form.discountValue);
    if (!form.code.trim() || Number.isNaN(discountValue)) return;

    const payload = {
      discountValue,
      expirationDate: form.expirationDate
        ? `${form.expirationDate}:00`
        : null,
      remainingUses: form.remainingUses ? Number(form.remainingUses) : null,
      active: form.active,
    };

    if (editing) {
      updatePromo.mutate(
        {
          code: editing.code,
          data: {
            ...payload,
            forDiscountedProductsOnly: form.onlyForDiscountedProducts,
          },
        },
        {
          onSuccess: () => {
            setFormModal(false);
            setEditing(null);
          },
        }
      );
    } else {
      createPromo.mutate(
        {
          code: form.code.trim().toUpperCase(),
          ...payload,
          onlyForDiscountedProducts: form.onlyForDiscountedProducts,
        },
        {
          onSuccess: () => {
            setFormModal(false);
          },
        }
      );
    }
  }

  function handleToggleActive(promo: PromoCodeSummary) {
    updatePromo.mutate({
      code: promo.code,
      data: { active: !promo.active },
    });
  }

  function handleConfirmDelete() {
    if (!deleteTarget) return;
    deletePromo.mutate(deleteTarget.code, {
      onSuccess: () => setDeleteTarget(null),
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-white">Promociones</h1>
          <p className="text-[13px] text-dark-dim mt-1">
            Gestiona los códigos descuento de tu tienda.
          </p>
        </div>
        <button onClick={openCreate} className="admin-btn-primary">
          <Plus size={16} />
          Nuevo código
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="admin-kpi">
          <div className="admin-kpi-value">{stats?.totalPromoCodes ?? 0}</div>
          <div className="admin-kpi-label">Códigos totales</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi-value">{stats?.activePromoCodes ?? 0}</div>
          <div className="admin-kpi-label">Activos</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi-value">{stats?.totalApplications ?? 0}</div>
          <div className="admin-kpi-label">Aplicaciones</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi-value">
            {formatCurrency(stats?.totalDiscountGiven ?? 0)}
          </div>
          <div className="admin-kpi-label">Descuento otorgado</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-faint"
          />
          <input
            type="text"
            placeholder="Buscar por código..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
            className="admin-input pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as StatusFilter);
            setPage(0);
          }}
          className="admin-select w-auto"
        >
          <option value="">Todos los estados</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
          <option value="expired">Caducados</option>
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="admin-skeleton h-14" />
          ))}
        </div>
      ) : promos.length > 0 ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Descuento</th>
                <th>Expiración</th>
                <th>Usos</th>
                <th>Restantes</th>
                <th>Estado</th>
                <th className="w-28"></th>
              </tr>
            </thead>
            <tbody>
              {promos.map((promo) => {
                const status = promoStatus(promo);
                return (
                  <tr key={promo.code}>
                    <td>
                      <span className="font-mono font-semibold text-white">
                        {promo.code}
                      </span>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-success">
                        {promo.discountValue}%
                      </span>
                    </td>
                    <td className="text-dark-soft text-[12px]">
                      {formatDate(promo.expirationDate)}
                    </td>
                    <td className="text-white font-medium">
                      {promo.timesUsed}
                    </td>
                    <td className="text-dark-soft">
                      {promo.remainingUses ?? '∞'}
                    </td>
                    <td>
                      <span className={`admin-badge ${status.className}`}>
                        {status.label}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEdit(promo)}
                          title="Editar"
                          className="p-2 rounded-lg text-dark-dim hover:text-blue-400 hover:bg-blue-400/[0.08] transition-all"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleToggleActive(promo)}
                          title={promo.active ? 'Desactivar' : 'Activar'}
                          className="p-2 rounded-lg text-dark-dim hover:text-lime hover:bg-lime/[0.08] transition-all"
                        >
                          <Tag size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(promo)}
                          title="Eliminar"
                          className="p-2 rounded-lg text-dark-dim hover:text-red-400 hover:bg-red-400/[0.08] transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="admin-pagination">
            <div className="admin-pagination-info">
              Mostrando {page * 10 + 1}–{Math.min((page + 1) * 10, totalElements)} de{' '}
              {totalElements} códigos
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
          <Tag size={40} className="mx-auto text-dark-border mb-3" />
          <p className="text-[15px] text-dark-dim font-medium">
            No hay códigos promocionales
          </p>
          <p className="text-[13px] text-dark-faint mt-1">
            Crea tu primer código para empezar a promocionar.
          </p>
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={formModal}
        onClose={() => {
          setFormModal(false);
          setEditing(null);
        }}
        title={editing ? `Editar ${editing.code}` : 'Nuevo código promocional'}
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-dark-dim uppercase tracking-wider mb-1.5">
              Código
            </label>
            <input
              type="text"
              value={form.code}
              disabled={!!editing}
              onChange={(e) =>
                setForm({ ...form, code: e.target.value.toUpperCase() })
              }
              className="w-full admin-input font-mono uppercase disabled:opacity-50"
              placeholder="EJ: VERANO20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-dark-dim uppercase tracking-wider mb-1.5">
                Descuento (%)
              </label>
              <input
                type="number"
                min={1}
                max={100}
                value={form.discountValue}
                onChange={(e) =>
                  setForm({ ...form, discountValue: e.target.value })
                }
                className="w-full admin-input"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-dark-dim uppercase tracking-wider mb-1.5">
                Usos restantes
              </label>
              <input
                type="number"
                min={0}
                value={form.remainingUses}
                onChange={(e) =>
                  setForm({ ...form, remainingUses: e.target.value })
                }
                className="w-full admin-input"
                placeholder="Ilimitado"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-dark-dim uppercase tracking-wider mb-1.5">
              Fecha de expiración
            </label>
            <input
              type="datetime-local"
              value={form.expirationDate}
              onChange={(e) =>
                setForm({ ...form, expirationDate: e.target.value })
              }
              className="w-full admin-input"
            />
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={form.onlyForDiscountedProducts}
              onChange={(e) =>
                setForm({
                  ...form,
                  onlyForDiscountedProducts: e.target.checked,
                })
              }
              className="w-4 h-4 rounded accent-brand"
            />
            <span className="text-[13px] text-dark-soft">
              Solo productos con descuento
            </span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="w-4 h-4 rounded accent-brand"
            />
            <span className="text-[13px] text-dark-soft">Código activo</span>
          </label>

          <div className="h-px bg-dark-surface" />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setFormModal(false);
                setEditing(null);
              }}
              className="admin-btn-secondary"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={
                createPromo.isPending ||
                updatePromo.isPending ||
                !form.code.trim() ||
                !form.discountValue
              }
              className="admin-btn-primary disabled:opacity-50"
            >
              {createPromo.isPending || updatePromo.isPending
                ? 'Guardando...'
                : editing
                ? 'Guardar cambios'
                : 'Crear código'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Eliminar código"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-[13px] text-dark-soft">
            ¿Seguro que quieres eliminar el código{' '}
            <span className="font-mono font-semibold text-white">
              {deleteTarget?.code}
            </span>
            ? Esta acción no se puede deshacer.
          </p>
          <div className="h-px bg-dark-surface" />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDeleteTarget(null)}
              className="admin-btn-secondary"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={deletePromo.isPending}
              className="admin-btn-primary bg-red-500 hover:bg-red-600 disabled:opacity-50"
            >
              {deletePromo.isPending ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
