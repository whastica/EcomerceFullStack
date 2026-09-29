import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, X } from 'lucide-react';

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Promoción de envíos"
      className="w-full bg-promo-gradient min-h-[60px] sm:min-h-[65px] flex items-center justify-between gap-3 sm:gap-6 px-3 sm:px-6 lg:px-8 py-2 sm:py-0"
    >
      {/* Izquierda: icono + texto en dos líneas */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <Truck size={22} className="shrink-0 text-white sm:w-6 sm:h-6" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-white font-bold text-[12px] sm:text-sm leading-tight">
            ¡Envíos gratis por compras superiores a 1.500.000!
          </p>
          <p className="text-white/70 text-[10px] sm:text-xs leading-tight">
            Aprovecha hoy: aplica a todos los pedidos.
          </p>
        </div>
      </div>

      {/* Derecha: botón píldora + cerrar */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <Link
          to="/catalog"
          className="rounded-full border border-white bg-transparent text-white text-[11px] sm:text-xs font-semibold px-3 sm:px-5 py-1.5 sm:py-2 whitespace-nowrap transition-colors duration-200 hover:bg-white hover:text-dark-background"
        >
          Comprar ahora
        </Link>
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Cerrar banner promocional"
          className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-colors duration-200"
        >
          <X size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
      </div>
    </aside>
  );
}
