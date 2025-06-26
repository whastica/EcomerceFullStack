import { Link } from 'react-router-dom';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  brand?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md dark:hover:shadow-xl transition-all duration-300 flex flex-col min-h-[360px] group">
      <Link to={`/product/${product.id}`} className="block w-full">
        <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 transition-colors duration-200">
            {product.name}
          </h3>
          {product.brand && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">
              {product.brand}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-base font-bold text-purple-600 dark:text-purple-400 transition-colors duration-200">
            ${product.price.toLocaleString()}
          </span>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded min-w-[90px] text-center transition-colors duration-200 ${
              product.isAvailable
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            }`}
          >
            {product.isAvailable ? 'Disponible' : 'Agotado'}
          </span>
        </div>
      </div>
    </div>
  );
}