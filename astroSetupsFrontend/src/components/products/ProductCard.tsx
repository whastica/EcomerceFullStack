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
      {/* Contenedor principal transparente */}
      <div className="relative overflow-hidden rounded-lg bg-transparent">
        {/* Imagen del producto */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Overlay sutil en hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Información del producto */}
        <div className="pt-3 text-center space-y-1">
          <h3 className="text-base font-semibold text-dark-text group-hover:text-[#FB5607] transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-lg font-bold text-dark-text group-hover:text-[#FB5607] transition-colors duration-200">
            ${product.price.toLocaleString()}
          </p>
          
          {/* Indicador de disponibilidad */}
          <div className="flex justify-center">
            <span className={`text-xs px-2 py-1 rounded-full ${
              product.isAvailable 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {product.isAvailable ? 'Disponible' : 'Agotado'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}