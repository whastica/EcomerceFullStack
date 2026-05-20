// AdminSidebar.tsx
import { Link } from 'react-router-dom';

export default function AdminSidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <div className={`w-64 glass-effect border-r border-dark-border text-dark-text overflow-y-auto ${isOpen ? 'block' : 'hidden lg:block'}`}>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-6">Panel Admin</h2>
        <nav className="space-y-2">
          <Link to="/admin/dashboard" className="block text-dark-muted hover:text-[#FB5607] transition-colors py-2">
            📊 Dashboard
          </Link>
          <Link to="/admin/products" className="block text-dark-muted hover:text-[#FB5607] transition-colors py-2">
            📦 Productos
          </Link>
          <Link to="/admin/orders" className="block text-dark-muted hover:text-[#FB5607] transition-colors py-2">
            📋 Pedidos
          </Link>
          <Link to="/admin/users" className="block text-dark-muted hover:text-[#FB5607] transition-colors py-2">
            👥 Usuarios
          </Link>
          <Link to="/admin/reports" className="block text-dark-muted hover:text-[#FB5607] transition-colors py-2">
            📈 Reportes
          </Link>
        </nav>
      </div>
    </div>
  );
}
