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
      className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group flex flex-col border border-dark-border bg-dark-card mb-4"
    >
      {/* Imagen sin margen arriba */}
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Contenido centrado */}
      <div className="px-4 pb-4 pt-2 flex-1 flex flex-col items-center justify-between text-center">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-dark-text group-hover:text-[#FB5607] transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-sm text-dark-text group-hover:text-[#FB5607] transition-colors duration-200 font-medium">
            {product.brand}
          </p>
          <p className="text-xl font-bold text-dark-text group-hover:text-[#FB5607] transition-colors duration-200">
            ${product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}