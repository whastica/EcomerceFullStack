import { useState } from 'react';
import {
  Users,
  Search,
  Eye,
  Shield,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Modal from '@/components/ui/admin/Modal';
import StatusBadge from '@/components/ui/admin/StatusBadge';
import { useAdminUsers, useAdminUserProfile } from '@/hooks/admin/useAdminUsers';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value);
}

export default function AdminUsersPage() {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [profileModal, setProfileModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const { data, isLoading } = useAdminUsers({
    searchTerm: searchTerm || undefined,
    role: roleFilter || undefined,
    page,
    size: 10,
  });

  const { data: profile, isLoading: loadingProfile } = useAdminUserProfile(
    selectedUserId ?? 0,
    selectedUserId !== null
  );

  const users = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;

  function handleViewProfile(userId: number) {
    setSelectedUserId(userId);
    setProfileModal(true);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-white">Clientes</h1>
          <p className="text-[13px] text-[#555555] mt-1">
            Gestiona los usuarios registrados.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444444]" />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
            className="admin-input pl-10"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => { setRoleFilter(e.target.value); setPage(0); }}
          className="admin-select w-auto"
        >
          <option value="">Todos los roles</option>
          <option value="CLIENT">Clientes</option>
          <option value="ADMIN">Administradores</option>
          <option value="SUPER_ADMIN">Super Admin</option>
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="admin-skeleton h-14" />
          ))}
        </div>
      ) : users.length > 0 ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-16">ID</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Pedidos</th>
                <th>Verificado</th>
                <th>Registro</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="font-mono text-[#555555]">#{user.id}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="admin-avatar">
                        {user.fullName
                          ?.split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.fullName}</p>
                        <p className="text-[11px] text-[#555555]">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      {user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ? (
                        <ShieldCheck size={14} className="text-[#FB5607]" />
                      ) : (
                        <Shield size={14} className="text-[#555555]" />
                      )}
                      <StatusBadge status={user.role} />
                    </div>
                  </td>
                  <td><StatusBadge status={user.status} /></td>
                  <td className="text-white font-medium">{user.totalOrders}</td>
                  <td>
                    <span
                      className={
                        user.verified
                          ? 'text-[#34D399] text-[12px] font-semibold bg-[rgba(52,211,153,0.1)] px-2 py-0.5 rounded-full'
                          : 'text-[#555555] text-[12px] bg-white/[0.03] px-2 py-0.5 rounded-full'
                      }
                    >
                      {user.verified ? 'Sí' : 'No'}
                    </span>
                  </td>
                  <td className="text-[#555555] text-[12px]">
                    {new Date(user.createdAt).toLocaleDateString('es-CO')}
                  </td>
                  <td>
                    <button
                      onClick={() => handleViewProfile(user.id)}
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
              {totalElements} usuarios
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
          <Users size={40} className="mx-auto text-[#333333] mb-3" />
          <p className="text-[15px] text-[#555555] font-medium">No hay usuarios</p>
          <p className="text-[13px] text-[#444444] mt-1">
            Los usuarios registrados aparecerán aquí.
          </p>
        </div>
      )}

      {/* Profile Modal */}
      <Modal
        isOpen={profileModal}
        onClose={() => { setProfileModal(false); setSelectedUserId(null); }}
        title="Perfil de Usuario"
        size="lg"
      >
        {loadingProfile ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="admin-skeleton h-12" />
            ))}
          </div>
        ) : profile ? (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="admin-avatar w-14 h-14 text-lg">
                {profile.fullName
                  ?.split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-white">
                  {profile.fullName}
                </h3>
                <p className="text-[13px] text-[#555555]">{profile.email}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <StatusBadge status={profile.role} />
                  <StatusBadge status={profile.status} />
                </div>
              </div>
            </div>

            <div className="h-px bg-[#1A1A1A]" />

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Teléfono', value: profile.phone || 'No registrado' },
                { label: 'Ciudad', value: profile.cityName || 'No registrada' },
                { label: 'Total Pedidos', value: String(profile.totalOrders) },
                { label: 'Total Gastado', value: formatCurrency(profile.totalSpent ?? 0) },
                { label: 'Pedidos Pendientes', value: String(profile.pendingOrders) },
                {
                  label: 'Último Pedido',
                  value: profile.lastOrderDate
                    ? new Date(profile.lastOrderDate).toLocaleDateString('es-CO')
                    : 'Sin pedidos',
                },
              ].map((item) => (
                <div key={item.label} className="p-3.5 rounded-lg bg-[#0E0E0E] border border-[#1A1A1A]">
                  <p className="text-[11px] text-[#555555] uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-[13px] text-white font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Addresses */}
            {profile.shippingAddresses && profile.shippingAddresses.length > 0 && (
              <div>
                <p className="text-[11px] text-[#555555] uppercase tracking-wider mb-2.5">
                  Direcciones de Envío
                </p>
                <div className="space-y-2">
                  {profile.shippingAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-3.5 rounded-lg bg-[#0E0E0E] border border-[#1A1A1A] hover:border-[#252525] transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[13px] text-white font-medium">{addr.addressLine1}</p>
                          {addr.addressLine2 && (
                            <p className="text-[11px] text-[#555555]">{addr.addressLine2}</p>
                          )}
                          <p className="text-[11px] text-[#555555] mt-1">
                            {addr.cityName}, {addr.stateName}, {addr.countryName}
                          </p>
                        </div>
                        {addr.isDefault && (
                          <span className="text-[10px] bg-[rgba(251,86,7,0.1)] text-[#FB5607] px-2 py-0.5 rounded-full font-semibold">
                            Principal
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="h-px bg-[#1A1A1A]" />

            <div className="flex justify-end">
              <button
                onClick={() => { setProfileModal(false); setSelectedUserId(null); }}
                className="admin-btn-secondary"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
