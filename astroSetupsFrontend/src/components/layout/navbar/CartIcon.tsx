import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CartIcon({ count = 0 }: { count?: number }) {
  return (
    <Link 
      to="/cart" 
      className="relative p-2 text-gray-300 hover:text-[#D7FE3B] transition-all duration-300 hover:scale-110 group"
      title={`Carrito${count > 0 ? ` (${count} ${count === 1 ? 'item' : 'items'})` : ''}`}
    >
      <ShoppingCart className="w-5 h-5 xl:w-6 xl:h-6 transition-all duration-300 group-hover:drop-shadow-lg" />
      <span className="sr-only">
        Carrito{count > 0 ? ` con ${count} ${count === 1 ? 'artículo' : 'artículos'}` : ' vacío'}
      </span>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#D7FE3B] text-gray-900 text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 animate-pulse shadow-lg">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
}