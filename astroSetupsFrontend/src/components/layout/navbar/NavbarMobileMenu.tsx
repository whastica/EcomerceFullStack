import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface NavbarMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onFAQClick: () => void;
}

export function NavbarMobileMenu({ isOpen, onClose, onFAQClick }: NavbarMobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleLinkClick = () => {
    onClose();
  };

  const handleFAQClick = () => {
    onFAQClick();
    onClose();
  };

  const linkClasses = "block px-4 py-3 text-gray-300 hover:text-[#D7FE3B] hover:bg-[#5A5A5A] transition-all duration-300 font-medium text-base border-b border-gray-600 last:border-b-0";

  return (
    <>
      {/* Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      
      {/* Menu */}
      <div
        ref={menuRef}
        className={`lg:hidden fixed top-0 right-0 w-80 h-full bg-[#4D4D4D] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header con botón de cerrar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <div className="flex items-center">
            <img
              src="/assets/icono/logo.png"
              alt="Astro Setups Logo"
              className="h-8 w-auto object-contain mr-3"
            />
            <span className="text-white font-semibold text-lg">Menú</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-300 hover:text-[#D7FE3B] transition-colors duration-200"
            aria-label="Cerrar menú"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="py-4">
          <Link to="/" className={linkClasses} onClick={handleLinkClick}>
            🏠 INICIO
          </Link>
          
          <Link to="/catalog" className={linkClasses} onClick={handleLinkClick}>
            📦 PRODUCTOS
          </Link>
          
          <button
            onClick={handleFAQClick}
            className={`${linkClasses} w-full text-left bg-transparent border-none cursor-pointer`}
          >
            ❓ PREGUNTAS FRECUENTES
          </button>
          
          <Link to="/promotions" className={linkClasses} onClick={handleLinkClick}>
            🎉 PROMOCIONES
          </Link>
          
          <Link
            to="/customSetup"
            className="block mx-4 my-4 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-base text-center
                       shadow-lg transform transition-all duration-200 hover:from-orange-600 hover:to-orange-700 hover:scale-105 hover:shadow-xl
                       active:scale-95 active:shadow-md border-2 border-orange-300"
            style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              boxShadow:
                '0 4px 15px rgba(255,165,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)',
            }}
            onClick={handleLinkClick}
          >
            🖥️ PERSONALIZA TU PC
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-600 bg-[#434343]">
          <div className="space-y-3">
            <Link 
              to="/login" 
              className="block w-full px-4 py-2 text-center text-gray-300 hover:text-[#D7FE3B] border border-gray-500 rounded-md transition-all duration-300 hover:border-[#D7FE3B]"
              onClick={handleLinkClick}
            >
              Iniciar Sesión
            </Link>
            <Link 
              to="/register" 
              className="block w-full px-4 py-2 text-center bg-[#D7FE3B] text-gray-900 hover:bg-[#c5ec29] rounded-md font-medium transition-all duration-300 hover:shadow-lg"
              onClick={handleLinkClick}
            >
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}