import { useState } from 'react';
import { Outlet, Routes, Route, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Menu,
  LogOut,
  User,
  ChevronDown,
} from 'lucide-react';
import AdminSidebar from '@/components/layout/sidebar/AdminSidebar';
import { useAuthStore } from '@/stores/authStore';
import DashboardPage from '@/pages/admin/DashboardPage';
import AdminProductsPage from '@/pages/admin/AdminProductsPage';
import AdminOrdersPage from '@/pages/admin/AdminOrdersPage';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="admin-page flex">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="admin-content flex flex-col">
        {/* Header */}
        <header className="admin-header">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-[#555555] hover:text-white hover:bg-white/5 lg:hidden transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className="admin-header-search">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444444]"
            />
            <input
              type="text"
              placeholder="Buscar..."
              className="admin-input pl-10"
            />
          </div>

          <div className="admin-header-actions">
            <button className="relative p-2.5 rounded-lg text-[#555555] hover:text-white hover:bg-white/5 transition-colors">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FB5607]" />
            </button>

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="admin-avatar">
                  {user?.firstName?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <span className="text-[13px] font-medium text-[#CCCCCC] hidden sm:block">
                  {user ? `${user.firstName} ${user.lastName}` : 'Admin'}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-[#555555] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-52 py-2 bg-[#111111] border border-[#1A1A1A] rounded-xl shadow-lg z-50">
                    <div className="px-4 py-2.5 border-b border-[#1A1A1A]">
                      <p className="text-[13px] font-medium text-white">
                        {user ? `${user.firstName} ${user.lastName}` : 'Admin'}
                      </p>
                      <p className="text-[11px] text-[#555555]">
                        {user?.email || 'admin@astrosetups.com'}
                      </p>
                    </div>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#777777] hover:text-white hover:bg-white/5 transition-colors">
                      <User size={15} />
                      Mi perfil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#F87171] hover:bg-[#F87171]/5 transition-colors"
                    >
                      <LogOut size={15} />
                      Cerrar sesión
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin" element={<DashboardPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
