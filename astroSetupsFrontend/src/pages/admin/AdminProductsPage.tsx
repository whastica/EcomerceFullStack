import { useEffect, useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Pencil,
  Power,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Modal from '@/components/ui/admin/Modal';
import {
  useAdminProductSearch,
  useAdminCategories,
  useDeleteProduct,
  useToggleProductActive,
} from '@/hooks/admin/useAdminProducts';
import { adminProductService } from '@/services/adminProduct.service';
import type { ProductSummary } from '@/interfaces/admin/admin.types';
import type { ProductSearchRequest } from '@/interfaces/product/product-search-request.interface';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value);
}

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  discountPrice: string;
  brand: string;
  categoryId: string;
  imageUrl: string;
  active: boolean;
}

const emptyForm: ProductFormData = {
  name: '',
  description: '',
  price: '',
  discountPrice: '',
  brand: '',
  categoryId: '',
  imageUrl: '',
  active: true,
};

export default function AdminProductsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductSummary | null>(null);
  const [form, setForm] = useState<ProductFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ProductSummary | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const searchFilters: ProductSearchRequest = {
    query: debouncedSearch || undefined,
    categoryId: categoryFilter ? Number(categoryFilter) : undefined,
    active: activeFilter === '' ? undefined : activeFilter === 'active',
    minStock:
      statusFilter === 'in_stock' || statusFilter === 'low_stock'
        ? 1
        : undefined,
    maxStock:
      statusFilter === 'low_stock'
        ? 5
        : statusFilter === 'out_of_stock'
        ? 0
        : undefined,
    page,
    size: 10,
  };

  const { data, isLoading } = useAdminProductSearch(searchFilters);
  const { data: categories } = useAdminCategories();
  const deleteProduct = useDeleteProduct();
  const toggleActive = useToggleProductActive();

  const products = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStock = products.filter((p) => p.stock <= 0).length;

  function toggleSelectAll() {
    if (selectedIds.size === products.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(products.map((p) => p.id)));
    }
  }

  function toggleSelect(id: number) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  }

  function handleEdit(product: ProductSummary) {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: '',
      price: String(product.price),
      discountPrice: product.discountPrice ? String(product.discountPrice) : '',
      brand: product.brand || '',
      categoryId: '',
      imageUrl: product.imageUrl || '',
      active: product.active ?? true,
    });
    setModalOpen(true);
  }

  function handleClose() {
    setModalOpen(false);
    setEditingProduct(null);
    setForm(emptyForm);
  }

  function handleConfirmDelete() {
    if (!deleteTarget) return;
    deleteProduct.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  }

  async function handleSave() {
    if (!form.name || !form.price) {
      toast.error('Nombre y precio son obligatorios');
      return;
    }
    setSaving(true);
    try {
      if (editingProduct) {
        await adminProductService.updateProduct(editingProduct.id, {
          name: form.name,
          description: form.description || null,
          price: parseFloat(form.price),
          discountPrice: form.discountPrice ? parseFloat(form.discountPrice) : null,
          brand: form.brand || null,
          categoryId: form.categoryId ? parseInt(form.categoryId) : undefined,
          imageUrl: form.imageUrl || null,
          active: form.active,
        });
        toast.success('Producto actualizado');
      } else {
        await adminProductService.createProduct({
          name: form.name,
          description: form.description || null,
          price: parseFloat(form.price),
          discountPrice: form.discountPrice ? parseFloat(form.discountPrice) : null,
          brand: form.brand || null,
          categoryId: parseInt(form.categoryId),
          imageUrl: form.imageUrl || null,
          hasVariations: false,
          active: form.active,
          stock: 0,
        });
        toast.success('Producto creado');
      }
      handleClose();
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
    } catch {
      toast.error('Error al guardar producto');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-white">Productos</h1>
          <p className="text-[13px] text-dark-dim mt-1">
            Gestiona el inventario, precios y disponibilidad de tus productos.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setForm(emptyForm);
            setModalOpen(true);
          }}
          className="admin-btn-primary"
        >
          <Plus size={16} />
          Agregar producto
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="admin-kpi">
          <div className="admin-kpi-icon bg-blue-400/[0.08]">
            <Package size={18} className="text-blue-400" />
          </div>
          <div className="admin-kpi-value">{totalElements}</div>
          <div className="admin-kpi-label">Total de productos</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi-icon bg-[rgba(52,211,153,0.08)]">
            <Package size={18} className="text-lime" />
          </div>
          <div className="admin-kpi-value">{totalStock}</div>
          <div className="admin-kpi-label">Productos en stock</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi-icon bg-[rgba(251,191,36,0.08)]">
            <Package size={18} className="text-amber-400" />
          </div>
          <div className="admin-kpi-value">{lowStock}</div>
          <div className="admin-kpi-label">Productos con stock bajo</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi-icon bg-[rgba(248,113,113,0.08)]">
            <Package size={18} className="text-red-400" />
          </div>
          <div className="admin-kpi-value">{outOfStock}</div>
          <div className="admin-kpi-label">Productos fuera de stock</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-faint" />
          <input
            type="text"
            placeholder="Buscar por nombre o marca..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input pl-10"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value); setPage(0); }}
          className="admin-select w-auto"
        >
          <option value="">Todas las categorías</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}
          className="admin-select w-auto"
        >
          <option value="">Todos los stocks</option>
          <option value="in_stock">En stock</option>
          <option value="low_stock">Stock bajo (1-5)</option>
          <option value="out_of_stock">Sin stock</option>
        </select>
        <select
          value={activeFilter}
          onChange={(e) => { setActiveFilter(e.target.value); setPage(0); }}
          className="admin-select w-auto"
        >
          <option value="">Activos e inactivos</option>
          <option value="active">Solo activos</option>
          <option value="inactive">Solo inactivos</option>
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="admin-skeleton h-14" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-12">
                  <input
                    type="checkbox"
                    className="admin-checkbox"
                    checked={selectedIds.size === products.length && products.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Producto</th>
                <th>Marca</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th className="w-24">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <input
                      type="checkbox"
                      className="admin-checkbox"
                      checked={selectedIds.has(product.id)}
                      onChange={() => toggleSelect(product.id)}
                    />
                  </td>
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
                          <Package size={16} className="text-dark-faint" />
                        </div>
                      )}
                      <div>
                        <p className="text-white font-medium">{product.name}</p>
                        {product.hasDiscount && (
                          <span className="text-[11px] text-brand font-medium">
                            Con descuento
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="text-dark-soft">{product.brand || '—'}</td>
                  <td className="text-dark-soft">{product.categoryName}</td>
                  <td>
                    <div>
                      <span className="text-white font-medium">
                        {formatCurrency(product.effectivePrice ?? product.price)}
                      </span>
                      {product.hasDiscount && product.discountPrice && (
                        <span className="block text-[11px] text-dark-dim line-through">
                          {formatCurrency(product.price)}
                        </span>
                      )}
                    </div>
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
                  <td>
                    <span
                      className={`admin-badge ${
                        product.active
                          ? 'admin-badge-success'
                          : 'admin-badge-neutral'
                      }`}
                    >
                      <span
                        className={`admin-badge-dot ${
                          product.active ? 'bg-lime' : 'bg-dark-dim'
                        }`}
                      />
                      {product.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(product)}
                        title="Editar"
                        className="p-2 rounded-lg text-dark-dim hover:text-blue-400 hover:bg-blue-400/[0.08] transition-all"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() =>
                          toggleActive.mutate({
                            id: product.id,
                            active: !product.active,
                          })
                        }
                        title={product.active ? 'Desactivar' : 'Activar'}
                        className="p-2 rounded-lg text-dark-dim hover:text-lime hover:bg-lime/[0.08] transition-all"
                      >
                        <Power size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(product)}
                        title="Eliminar"
                        className="p-2 rounded-lg text-dark-dim hover:text-red-400 hover:bg-red-400/[0.08] transition-all"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="admin-pagination">
            <div className="admin-pagination-info">
              Mostrando {page * 10 + 1}–{Math.min((page + 1) * 10, totalElements)} de{' '}
              {totalElements} productos
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
          <Package size={40} className="mx-auto text-dark-border mb-3" />
          <p className="text-[15px] text-dark-dim font-medium">No hay productos</p>
          <p className="text-[13px] text-dark-faint mt-1">
            Comienza agregando productos al catálogo.
          </p>
        </div>
      )}

      {/* Modal Create/Edit */}
      <Modal
        isOpen={modalOpen}
        onClose={handleClose}
        title={editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-dark-dim uppercase tracking-wider mb-1.5">
              Nombre *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full admin-input"
              placeholder="Nombre del producto"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-dark-dim uppercase tracking-wider mb-1.5">
              Descripción
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full admin-input resize-none"
              placeholder="Descripción del producto"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-dark-dim uppercase tracking-wider mb-1.5">
                Precio *
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full admin-input"
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-dark-dim uppercase tracking-wider mb-1.5">
                Precio Descuento
              </label>
              <input
                type="number"
                value={form.discountPrice}
                onChange={(e) => setForm({ ...form, discountPrice: e.target.value })}
                className="w-full admin-input"
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-dark-dim uppercase tracking-wider mb-1.5">
                Marca
              </label>
              <input
                type="text"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className="w-full admin-input"
                placeholder="Marca"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-dark-dim uppercase tracking-wider mb-1.5">
                Categoría
              </label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="w-full admin-select"
              >
                <option value="">Seleccionar...</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-dark-dim uppercase tracking-wider mb-1.5">
              URL de Imagen
            </label>
            <input
              type="text"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="w-full admin-input"
              placeholder="https://..."
            />
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-dark-sunken border border-dark-surface">
            <input
              type="checkbox"
              id="active"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="admin-checkbox"
            />
            <label htmlFor="active" className="text-[13px] text-dark-soft">
              Producto activo
            </label>
          </div>
          <div className="h-px bg-dark-surface" />
          <div className="flex justify-end gap-3">
            <button onClick={handleClose} className="admin-btn-secondary">
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="admin-btn-primary disabled:opacity-50"
            >
              {saving ? 'Guardando...' : editingProduct ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal Delete */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Desactivar producto"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-[13px] text-dark-soft">
            ¿Seguro que quieres desactivar{' '}
            <span className="font-semibold text-white">{deleteTarget?.name}</span>
            ? Dejará de mostrarse en la tienda.
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
              disabled={deleteProduct.isPending}
              className="admin-btn-primary bg-red-500 hover:bg-red-600 disabled:opacity-50"
            >
              {deleteProduct.isPending ? 'Desactivando...' : 'Desactivar'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
