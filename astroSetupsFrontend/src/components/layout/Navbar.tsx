import { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  cartItemCount?: number;
  isAuthenticated?: boolean;
  userRole?: 'CLIENT' | 'ADMIN';
  userName?: string;
  onFAQClick?: () => void; // <- ✨ Esta es la nueva línea
}

export default function Navbar({
  cartItemCount = 0,
  isAuthenticated = false,
  userRole = 'CLIENT',
  userName = ''
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Astro Setups</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link to="/" className="hover:text-purple-600">Inicio</Link>
            <Link to="/products" className="hover:text-purple-600">Catálogo</Link>
            <a href="/#faq" className="hover:text-purple-600">Preguntas Frecuentes</a>
            <Link to="/promotions" className="hover:text-purple-600">Promociones</Link>
            <Link
              to="/customPc"
              className="text-white bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded-md transition whitespace-nowrap"
            >
              🖥️ Personaliza tu PC
            </Link>
          </div>

          {/* Right Items */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative text-gray-700 hover:text-purple-600">
              🛒
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 h-5 min-w-[1.25rem] text-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>

            {/* User */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-purple-600"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden xl:inline text-sm font-medium">{userName}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border z-50 py-1">
                    <Link to="/profile" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>Mi Perfil</Link>
                    <Link to="/orders" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>Mis Pedidos</Link>
                    {userRole === 'ADMIN' && (
                      <Link to="/admin" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>Panel Admin</Link>
                    )}
                    <hr />
                    <button onClick={() => console.log('logout')} className="dropdown-item w-full text-left">Cerrar Sesión</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-purple-600">Iniciar Sesión</Link>
                <Link to="/register" className="text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md">Registrarse</Link>
              </div>
            )}

            {/* Mobile menu btn */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-purple-600"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-4 pb-4 flex flex-col space-y-3 pt-2 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-purple-600">Inicio</Link>
          <Link to="/products" className="hover:text-purple-600">Catálogo</Link>
          <a href="/#faq" className="hover:text-purple-600">Preguntas Frecuentes</a>
          <Link to="/promotions" className="hover:text-purple-600">Promociones</Link>
          <Link to="/customPc" className="btn-gradient text-center">🖥️ Personaliza tu PC</Link>
        </div>
      )}
    </nav>
  );
}