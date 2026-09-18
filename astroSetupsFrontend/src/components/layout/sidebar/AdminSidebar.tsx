import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  BarChart3,
  Settings,
  LifeBuoy,
  X,
} from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Productos', icon: Package },
  { to: '/admin/orders', label: 'Pedidos', icon: ShoppingCart },
  { to: '/admin/users', label: 'Clientes', icon: Users },
  { to: '/admin/promotions', label: 'Promociones', icon: Tag },
  { to: '/admin/reports', label: 'Reportes', icon: BarChart3 },
  { to: '/admin/settings', label: 'Configuración', icon: Settings },
];

export default function AdminSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => void;
}) {
  const { pathname } = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`admin-sidebar ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="admin-sidebar-logo">
          <img
            src="/assets/icono/logo.png"
            alt="Astro Admin"
            className="admin-sidebar-logo-icon object-contain"
          />
          <div>
            <div className="text-[15px] font-bold text-white tracking-tight">
              ASTRO
            </div>
            <div className="text-[10px] text-[#555555] font-medium tracking-wider uppercase">
              Admin Panel
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-auto p-1.5 rounded-lg text-[#555555] hover:text-white hover:bg-white/5 lg:hidden transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="admin-sidebar-nav">
          <div className="admin-sidebar-section-label">Menú</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`admin-sidebar-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Support Card */}
        <div className="admin-sidebar-support">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[rgba(251,86,7,0.1)] flex items-center justify-center">
              <LifeBuoy size={16} className="text-[#FB5607]" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-[#CCCCCC]">
                ¿Necesitas ayuda?
              </p>
              <p className="text-[11px] text-[#555555]">
                Contactar soporte
              </p>
            </div>
          </div>
          <button className="w-full h-9 rounded-lg bg-[#FB5607]/10 text-[#FB5607] text-[12px] font-semibold hover:bg-[#FB5607]/15 transition-colors">
            Contactar soporte
          </button>
        </div>
      </aside>
    </>
  );
}
