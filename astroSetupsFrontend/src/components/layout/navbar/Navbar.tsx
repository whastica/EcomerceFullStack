import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartIcon } from './CartIcon';
import { NavbarMobileMenu } from './NavbarMobileMenu';
import { MobileToggleButton } from '../../layout/navbar/MobileToggleButton';

interface NavbarProps {
  cartItemCount?: number;
  onFAQClick?: () => void;
}

export function Navbar({
  cartItemCount = 0,
  onFAQClick,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleFAQClick = () => {
    if (location.pathname !== '/') {
      // Redirigir a "/" y usar hash para ir al FAQ
      navigate('/#faq');
    } else {
      onFAQClick?.();
    }
  };

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
          <div className="hidden lg:flex items-baseline space-x-4">
            <Link to="/" className="text-gray-300 hover:text-[#D7FE3B] px-3 py-2 text-sm font-medium transition-colors duration-200">
              Inicio
            </Link>
            <Link to="/catalog" className="text-gray-300 hover:text-[#D7FE3B] px-3 py-2 text-sm font-medium transition-colors duration-200">
              Catálogo
            </Link>
            <button
              onClick={handleFAQClick}
              className="text-gray-300 hover:text-[#D7FE3B] px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Preguntas Frecuentes
            </button>
            <Link to="/promotions" className="text-gray-300 hover:text-[#D7FE3B] px-3 py-2 text-sm font-medium transition-colors duration-200">
              Promociones
            </Link>
            <Link
              to="/customSetup"
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

          {/* Right section */}
          <div className="hidden lg:flex items-center space-x-4">
            <CartIcon count={cartItemCount} />
            <div className="flex items-center space-x-3">
              <Link to="/login" className="text-gray-300 hover:text-[#D7FE3B] px-3 py-2 text-sm font-medium">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="bg-[#D7FE3B] text-gray-900 hover:bg-[#c5ec29] px-3 py-2 rounded-md text-sm font-medium">
                Registrarse
              </Link>
            </div>
          </div>

          {/* Mobile toggle button */}
          <MobileToggleButton isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
        </div>
      </div>

      {/* Mobile Menu */}
      <NavbarMobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onFAQClick={handleFAQClick} />
    </nav>
  );
}