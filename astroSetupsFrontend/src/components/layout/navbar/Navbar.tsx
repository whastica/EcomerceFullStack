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
      navigate('/#faq');
    } else {
      onFAQClick?.();
    }
  };

  // Clases optimizadas para links con mejor espaciado
  const linkHoverClasses = "text-gray-300 hover:text-[#D7FE3B] px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-all duration-300 relative group whitespace-nowrap";
  const underlineClasses = "absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#D7FE3B] transition-all duration-300 group-hover:w-full group-hover:left-0";

  return (
    <nav className="bg-[#4D4D4D] shadow-lg sticky top-0 z-50 font-helvetica">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          {/*<div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/assets/icono/logo.png"
                alt="Astro Setups Logo"
                className="h-8 xl:h-10 w-auto object-contain"
              />
            </Link>
          </div>*/}

          {/* Desktop Links - Ajustado para mejor distribución */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-1 xl:space-x-2 2xl:space-x-4">
              <Link to="/" className={linkHoverClasses}>
                INICIO
                <span className={underlineClasses}></span>
              </Link>
              
              <Link to="/catalog" className={linkHoverClasses}>
                PRODUCTOS
                <span className={underlineClasses}></span>
              </Link>
              
              <button
                onClick={handleFAQClick}
                className={`${linkHoverClasses} bg-transparent border-none cursor-pointer`}
                title="Preguntas Frecuentes"
              >
                <span className="hidden xl:inline">PREGUNTAS FRECUENTES</span>
                <span className="xl:hidden">PREGUNTAS FRECUENTES</span>
                <span className={underlineClasses}></span>
              </button>
              
              <Link to="/promotions" className={linkHoverClasses}>
                PROMOCIONES
                <span className={underlineClasses}></span>
              </Link>
              
              <Link
                to="/customSetup"
                className="ml-2 xl:ml-4 px-2 xl:px-4 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-xs xl:text-sm
                           shadow-lg transform transition-all duration-200 hover:from-orange-600 hover:to-orange-700 hover:scale-105 hover:shadow-xl
                           active:scale-95 active:shadow-md border-2 border-orange-300 relative overflow-hidden group whitespace-nowrap"
                style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  boxShadow:
                    '0 4px 15px rgba(255,165,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)',
                }}
                title="Personaliza tu PC"
              >
                <span className="hidden xl:inline">🖥️ PERSONALIZA TU PC</span>
                <span className="xl:hidden">🖥️ PERSONALIZA TU PC</span>
              </Link>
            </div>
          </div>

          {/* Right section - Compacto */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <CartIcon count={cartItemCount} />
            <div className="flex items-center space-x-1 xl:space-x-3">
              <Link to="/login" className="text-gray-300 hover:text-[#D7FE3B] px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-all duration-300 relative group whitespace-nowrap">
                <span className="hidden xl:inline">Iniciar Sesión</span>
                <span className="xl:hidden">Iniciar Sesión</span>
                <span className={underlineClasses}></span>
              </Link>
              <Link 
                to="/register" 
                className="bg-[#D7FE3B] text-gray-900 hover:bg-[#c5ec29] px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 whitespace-nowrap"
              >
                <span className="hidden xl:inline">Registrarse</span>
                <span className="xl:hidden">Registrarse</span>
              </Link>
            </div>
          </div>

          {/* Mobile toggle button */}
          <div className="lg:hidden flex items-center space-x-4">
            <CartIcon count={cartItemCount} />
            <MobileToggleButton isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <NavbarMobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onFAQClick={handleFAQClick} />
    </nav>
  );
}