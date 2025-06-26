import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';

interface NavbarProps {
  cartItemCount?: number;
  isAuthenticated?: boolean;
  userRole?: 'CLIENT' | 'ADMIN';
  userName?: string;
}

export default function Navbar({
  cartItemCount = 0,
  isAuthenticated = false,
  userRole = 'CLIENT',
  userName = ''
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Búsqueda:', searchQuery);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
              Astro Setups
            </span>
          </Link>

          {/* Search bar (desktop) */}
          <div className="hidden lg:flex flex-1 justify-center">
            <form onSubmit={handleSearch} className="relative w-full max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                         placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         transition-colors duration-200"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 
                         text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300
                         transition-colors duration-200"
              >
                🔍
              </button>
            </form>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex space-x-4 items-center">
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/products" className="nav-link">Catálogo</Link>
            <Link to="/promotions" className="nav-link">Promociones</Link>
            <Link to="/contact" className="nav-link">Preguntas Frecuentes</Link>
            <Link to="/customPc" className="btn-gradient">🖥️ Personaliza tu PC</Link>
          </div>

          {/* Right Items */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
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
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden xl:inline text-sm font-medium">{userName}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 z-50 py-1">
                    <Link to="/profile" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>Mi Perfil</Link>
                    <Link to="/orders" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>Mis Pedidos</Link>
                    {userRole === 'ADMIN' && (
                      <Link to="/admin" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>Panel Admin</Link>
                    )}
                    <hr className="border-gray-200 dark:border-gray-600" />
                    <button onClick={() => console.log('logout')} className="dropdown-item w-full text-left">Cerrar Sesión</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md transition-colors duration-200">
                  Registrarse
                </Link>
              </div>
            )}

            {/* Mobile menu btn */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="lg:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                     placeholder-gray-500 dark:placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                     transition-colors duration-200"
          />
          <button
            type="submit"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 
                     text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300
                     transition-colors duration-200"
          >
            🔍
          </button>
        </form>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-4 pb-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <Link to="/" className="mobile-link">Inicio</Link>
          <Link to="/products" className="mobile-link">Catálogo</Link>
          <Link to="/promotions" className="mobile-link">Promociones</Link>
          <Link to="/contact" className="mobile-link">Preguntas Frecuentes</Link>
          <Link to="/customPc" className="btn-gradient block w-full text-center mt-2">🖥️ Personaliza tu PC</Link>
        </div>
      )}
    </nav>
  );
}