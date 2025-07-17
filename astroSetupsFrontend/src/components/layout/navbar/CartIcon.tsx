import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CartIcon({ count = 0 }: { count?: number }) {
  return (
    <Link to="/cart" className="relative">
      <ShoppingCart className="w-5 h-5" />
      <span className="sr-only">Carrito</span>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full px-1">
          {count}
        </span>
      )}
    </Link>
  );
}