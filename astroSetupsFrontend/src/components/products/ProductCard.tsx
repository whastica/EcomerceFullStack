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
      className="bg-dark-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-600 group overflow-hidden flex flex-col border border-dark-border"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-48 object-cover w-full group-hover:scale-105 transition-transform duration-300"
        />
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-sm bg-red-600 px-3 py-1 rounded-full">
              Agotado
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2 mb-4">
          <h3 className="text-lg font-semibold text-dark-text group-hover:text-purple-400 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-sm text-dark-muted font-medium">{product.brand}</p>
          <p className="text-xl font-bold text-purple-500">
            ${product.price.toLocaleString()}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
            product.isAvailable 
              ? 'bg-green-900 text-green-200 border border-green-700' 
              : 'bg-red-900 text-red-200 border border-red-700'
          }`}>
            {product.isAvailable ? '✓ Disponible' : '✗ Agotado'}
          </span>
          
          <div className="text-dark-muted group-hover:text-purple-400 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}