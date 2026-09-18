import { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Pencil,
  MoreHorizontal,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Modal from '@/components/ui/admin/Modal';
import { useAdminProducts, useAdminCategories } from '@/hooks/admin/useAdminProducts';
import { adminProductService } from '@/services/adminProduct.service';
import type { ProductSummary } from '@/interfaces/admin/admin.types';
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
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductSummary | null>(null);
  const [form, setForm] = useState<ProductFormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const { data, isLoading } = useAdminProducts(page, 10);
  const { data: categories } = useAdminCategories();

  const products = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStock = products.filter((p) => p.stock <= 0).length;

  const filteredProducts = products.filter((p) => {
    const matchesSearch = search
      ? p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand?.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesCategory = categoryFilter
      ? p.categoryName === categoryFilter
      : true;
    const matchesStatus =
      statusFilter === 'in_stock'
        ? p.stock > 5
        : statusFilter === 'low_stock'
        ? p.stock > 0 && p.stock <= 5
        : statusFilter === 'out_of_stock'
        ? p.stock <= 0
        : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  function toggleSelectAll() {
    if (selectedIds.size === filteredProducts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredProducts.map((p) => p.id)));
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
      active: true,
    });
    setModalOpen(true);
  }

  function handleClose() {
    setModalOpen(false);
    setEditingProduct(null);
    setForm(emptyForm);
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
          categoryId: form.categoryId ? parseInt(form.categoryId) : 0,
          imageUrl: form.imageUrl || null,
          active: form.active,
        } as never);
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
          <p className="text-[13px] text-[#555555] mt-1">
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
          <div className="admin-kpi-icon bg-[rgba(96,165,250,0.08)]">
            <Package size={18} className="text-[#60A5FA]" />
          </div>
          <div className="admin-kpi-value">{totalElements}</div>
          <div className="admin-kpi-label">Total de productos</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi-icon bg-[rgba(52,211,153,0.08)]">
            <Package size={18} className="text-[#34D399]" />
          </div>
          <div className="admin-kpi-value">{totalStock}</div>
          <div className="admin-kpi-label">Productos en stock</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi-icon bg-[rgba(251,191,36,0.08)]">
            <Package size={18} className="text-[#FBBF24]" />
          </div>
          <div className="admin-kpi-value">{lowStock}</div>
          <div className="admin-kpi-label">Productos con stock bajo</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi-icon bg-[rgba(248,113,113,0.08)]">
            <Package size={18} className="text-[#F87171]" />
          </div>
          <div className="admin-kpi-value">{outOfStock}</div>
          <div className="admin-kpi-label">Productos fuera de stock</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444444]" />
          <input
            type="text"
            placeholder="Buscar producto por nombre, SKU o categoría..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input pl-10"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="admin-select w-auto"
        >
          <option value="">Todas las categorías</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="admin-select w-auto"
        >
          <option value="">Todos los estados</option>
          <option value="in_stock">En stock</option>
          <option value="low_stock">Stock bajo</option>
          <option value="out_of_stock">Sin stock</option>
        </select>
        <button className="admin-btn-secondary">
          <Filter size={15} />
          Más filtros
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="admin-skeleton h-14" />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-12">
                  <input
                    type="checkbox"
                    className="admin-checkbox"
                    checked={selectedIds.size === filteredProducts.length && filteredProducts.length > 0}
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
              {filteredProducts.map((product) => (
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
                          <Package size={16} className="text-[#444444]" />
                        </div>
                      )}
                      <div>
                        <p className="text-white font-medium">{product.name}</p>
                        {product.hasDiscount && (
                          <span className="text-[11px] text-[#FB5607] font-medium">
                            Con descuento
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="text-[#777777]">{product.brand || '—'}</td>
                  <td className="text-[#777777]">{product.categoryName}</td>
                  <td>
                    <div>
                      <span className="text-white font-medium">
                        {formatCurrency(product.effectivePrice ?? product.price)}
                      </span>
                      {product.hasDiscount && product.discountPrice && (
                        <span className="block text-[11px] text-[#555555] line-through">
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
                        product.stock > 0
                          ? 'admin-badge-success'
                          : 'admin-badge-danger'
                      }`}
                    >
                      <span
                        className={`admin-badge-dot ${
                          product.stock > 0 ? 'bg-[#34D399]' : 'bg-[#F87171]'
                        }`}
                      />
                      {product.stock > 0 ? 'Disponible' : 'Agotado'}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button className="p-2 rounded-lg text-[#555555] hover:text-[#60A5FA] hover:bg-[rgba(96,165,250,0.08)] transition-all">
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 rounded-lg text-[#555555] hover:text-[#FB5607] hover:bg-[rgba(251,86,7,0.08)] transition-all"
                      >
                        <Pencil size={15} />
                      </button>
                      <button className="p-2 rounded-lg text-[#555555] hover:text-white hover:bg-white/5 transition-all">
                        <MoreHorizontal size={15} />
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
          <Package size={40} className="mx-auto text-[#333333] mb-3" />
          <p className="text-[15px] text-[#555555] font-medium">No hay productos</p>
          <p className="text-[13px] text-[#444444] mt-1">
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
            <label className="block text-[11px] font-semibold text-[#555555] uppercase tracking-wider mb-1.5">
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
            <label className="block text-[11px] font-semibold text-[#555555] uppercase tracking-wider mb-1.5">
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
              <label className="block text-[11px] font-semibold text-[#555555] uppercase tracking-wider mb-1.5">
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
              <label className="block text-[11px] font-semibold text-[#555555] uppercase tracking-wider mb-1.5">
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
              <label className="block text-[11px] font-semibold text-[#555555] uppercase tracking-wider mb-1.5">
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
              <label className="block text-[11px] font-semibold text-[#555555] uppercase tracking-wider mb-1.5">
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
            <label className="block text-[11px] font-semibold text-[#555555] uppercase tracking-wider mb-1.5">
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
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0E0E0E] border border-[#1A1A1A]">
            <input
              type="checkbox"
              id="active"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="admin-checkbox"
            />
            <label htmlFor="active" className="text-[13px] text-[#777777]">
              Producto activo
            </label>
          </div>
          <div className="h-px bg-[#1A1A1A]" />
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
    </div>
  );
}
