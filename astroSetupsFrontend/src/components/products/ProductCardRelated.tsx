import { Link } from 'react-router-dom';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  brand: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
    >
      <div className="relative overflow-hidden bg-transparent border border-white border-t-0">
        {/* Imagen del producto */}
        <div className="relative overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full object-cover aspect-[4/5] transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Información */}
        <div className="p-4 text-center space-y-2">
          <h3 className="text-base font-semibold text-dark-text group-hover:text-[#FB5607] transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
          <p
            className="text-lg font-bold transition-colors duration-200"
            style={{ color: '#CAD519' }}
          >
            ${product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}