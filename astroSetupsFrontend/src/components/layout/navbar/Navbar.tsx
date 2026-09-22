import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Shield, ChevronDown } from 'lucide-react';
import { NavbarMobileMenu } from './NavbarMobileMenu';
import { MobileToggleButton } from './MobileToggleButton';
import { SearchBar } from './SearchBar';
import { useAuth } from '@/hooks/useAuth';

interface NavbarProps {
  cartItemCount?: number;
  onFAQClick?: () => void;
}

export function Navbar({
  cartItemCount = 0,
  onFAQClick,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, isAdmin, logout } = useAuth();

  const handleFAQClick = () => {
    if (location.pathname !== '/') {
      navigate('/#faq');
    } else {
      onFAQClick?.();
    }
  };

  const linkHoverClasses = "text-white hover:text-[#D7FE3B] px-2 xl:px-3 py-2 text-[12px] font-medium transition-all duration-300 relative group whitespace-nowrap uppercase";
  const underlineClasses = "absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#D7FE3B] transition-all duration-300 group-hover:w-full group-hover:left-0";

  return (
    <nav className="bg-[#4D4D4D] shadow-lg sticky top-0 z-50 font-montserrat font-medium">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">

          {/* 1. Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/assets/icono/logo.png"
                alt="Astro Setups Logo"
                className="h-8 xl:h-9 w-auto object-contain"
              />
            </Link>
          </div>

          {/* 2. Links Centrales */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-1 xl:space-x-2">
              <Link to="/" className={linkHoverClasses}>INICIO<span className={underlineClasses}/></Link>
              <Link to="/catalog" className={linkHoverClasses}>PRODUCTOS<span className={underlineClasses}/></Link>
              <Link to="/contact" className={linkHoverClasses}>CONTACTO<span className={underlineClasses}/></Link>
              <button onClick={handleFAQClick} className={linkHoverClasses}>
                PREGUNTAS FRECUENTES
                <span className={underlineClasses}/>
              </button>

              <Link
                to="/custom-pc"
                className="ml-2 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-[11px] shadow-md hover:scale-105 transition-all whitespace-nowrap border border-orange-300"
              >
                <span className="hidden xl:inline">🖥️ PERSONALIZA TU PC</span>
              </Link>
            </div>
          </div>

          {/* 3. Acciones Derecha */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="flex items-center mr-1">
              <Link to="/cart" className="p-2 text-white hover:text-[#D7FE3B] transition-all">
                <ShoppingBag className="w-5 h-5" />
              </Link>

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-1.5 text-white text-[11px] hover:text-[#D7FE3B] transition-all whitespace-nowrap px-2 py-1.5 rounded-lg hover:bg-white/10"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#8B5CF6]/30 flex items-center justify-center text-[10px] font-bold text-[#8B5CF6]">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </div>
                    <span className="font-medium hidden sm:inline">{user?.firstName}</span>
                    <ChevronDown size={12} />
                  </button>

                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-dark-border bg-dark-surface shadow-glass z-50 py-1 animate-scale-in">
                        <div className="px-3 py-2 border-b border-dark-border">
                          <p className="text-xs font-medium text-dark-text truncate">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-[10px] text-dark-muted truncate">
                            {user?.email}
                          </p>
                        </div>
                        {isAdmin && (
                          <Link
                            to="/admin/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-dark-muted hover:text-[#8B5CF6] hover:bg-dark-surface transition-colors"
                          >
                            <Shield size={14} />
                            Panel Admin
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-dark-muted hover:text-red-400 hover:bg-dark-surface transition-colors"
                        >
                          <LogOut size={14} />
                          Cerrar Sesión
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center text-white text-[11px] hover:text-[#D7FE3B] transition-all whitespace-nowrap px-1"
                >
                  <User className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span className="font-medium">Iniciar Sesión</span>
                </Link>
              )}
            </div>

            <div className="relative flex items-center bg-[#3a3a3a] rounded-md border border-gray-500/30">
              <SearchBar />
            </div>

            <MobileToggleButton isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
          </div>

        </div>
      </div>

      <NavbarMobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onFAQClick={handleFAQClick}
      />
    </nav>
  );
}
