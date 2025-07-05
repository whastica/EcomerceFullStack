import { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  cartItemCount?: number;
  isAuthenticated?: boolean;
  userRole?: 'CLIENT' | 'ADMIN';
  userName?: string;
  onFAQClick?: () => void;
}

export default function Navbar({
  cartItemCount = 0,
  isAuthenticated = false,
  userRole = 'CLIENT',
  userName = '',
  onFAQClick,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="bg-[#4D4D4D] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/assets/icono/logo.png"
                alt="Astro Setups Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-300 hover:text-[#D7FE3B] px-3 py-2 text-sm font-medium transition-colors duration-200">
                Inicio
              </Link>
              <Link to="/catalog" className="text-gray-300 hover:text-[#D7FE3B] px-3 py-2 text-sm font-medium transition-colors duration-200">
                Catálogo
              </Link>
              <button onClick={onFAQClick} className="text-gray-300 hover:text-[#D7FE3B] px-3 py-2 text-sm font-medium transition-colors duration-200">
                Preguntas Frecuentes
              </button>
              <Link to="/promotions" className="text-gray-300 hover:text-[#D7FE3B] px-3 py-2 text-sm font-medium transition-colors duration-200">
                Promociones
              </Link>
              <Link
                to="/customize"
                className="mx-2 px-4 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-sm
                           shadow-lg transform transition-all duration-200 hover:from-orange-600 hover:to-orange-700 hover:scale-105 hover:shadow-xl
                           active:scale-95 active:shadow-md border-2 border-orange-300"
                style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  boxShadow:
                    '0 4px 15px rgba(255,165,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)',
                }}
              >
                🖥️ Personaliza tu PC
              </Link>
            </div>
          </div>

          {/* Right Items */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="text-gray-300 hover:text-[#D7FE3B] px-3 py-2 text-sm font-medium relative">
              🛒
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>

            {/* User */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 text-white hover:text-[#D7FE3B] transition-colors duration-200 px-3 py-1.5 rounded-md hover:bg-gray-600"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-900 border-b border-gray-200">
                      <div className="font-medium">{userName}</div>
                      <div className="text-xs text-gray-500">{userRole.toLowerCase()}</div>
                    </div>
                    <Link to="/profile" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      👤 Mi Perfil
                    </Link>
                    <Link to="/orders" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      📦 Mis Pedidos
                    </Link>
                    {userRole === 'ADMIN' && (
                      <Link to="/admin" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        ⚙️ Panel Admin
                      </Link>
                    )}
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        console.log('logout');
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white"
                    >
                      🚪 Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-300 hover:text-[#D7FE3B] px-3 py-2 text-sm font-medium">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="bg-[#D7FE3B] text-gray-900 hover:bg-[#c5ec29] px-3 py-2 rounded-md text-sm font-medium">
                  Registrarse
                </Link>
              </div>
            )}

            {/* Mobile Menu Button (hidden on lg) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:text-[#D7FE3B] px-3 py-2 rounded-md"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#4D4D4D]">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-white hover:text-[#D7FE3B]">
              🏠 Inicio
            </Link>
            <Link to="/catalog" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-white hover:text-[#D7FE3B]">
              📦 Catálogo
            </Link>
            <button
              onClick={() => {
                onFAQClick?.();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-3 text-white hover:text-[#D7FE3B]"
            >
              ❓ Preguntas Frecuentes
            </button>
            <Link to="/promotions" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-white hover:text-[#D7FE3B]">
              🎉 Promociones
            </Link>
            <Link
              to="/customize"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mx-3 my-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-lg text-center
                         shadow-lg hover:from-orange-600 hover:to-orange-700 hover:scale-105 transition-all duration-200"
            >
              🖥️ Personaliza tu PC
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}