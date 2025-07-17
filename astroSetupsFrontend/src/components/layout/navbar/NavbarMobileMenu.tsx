import { NavLink } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onFAQClick?: () => void;
}

export function NavbarMobileMenu({ isOpen, onClose, onFAQClick }: Props) {
  if (!isOpen) return null;

  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/catalog' },
    { name: 'Promociones', path: '/promotions' },
  ];

  return (
    <div className="md:hidden absolute top-full left-0 right-0 z-20 bg-white dark:bg-dark-surface shadow-md border-t border-border">
      <nav className="flex flex-col py-4 px-6 gap-4">
        {links.map(({ name, path }) => (
          <NavLink
            key={name}
            to={path}
            onClick={onClose}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors hover:text-primary ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`
            }
          >
            {name}
          </NavLink>
        ))}

        {/* Preguntas Frecuentes (botón personalizado) */}
        <button
          onClick={() => {
            onFAQClick?.();
            onClose();
          }}
          className="text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          ❓ Preguntas Frecuentes
        </button>

        {/* Personaliza tu PC */}
        <NavLink
          to="/customize"
          onClick={onClose}
          className="block mx-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-sm text-center
                    shadow-lg hover:from-orange-600 hover:to-orange-700 hover:scale-105 transition-all duration-200"
        >
          🖥️ Personaliza tu PC
        </NavLink>
      </nav>
    </div>
  );
}