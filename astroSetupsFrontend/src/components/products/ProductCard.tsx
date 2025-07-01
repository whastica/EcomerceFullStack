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
      className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-600 group overflow-hidden flex flex-col"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-48 object-cover w-full group-hover:scale-105 transition-transform duration-300"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <p className="text-xl font-bold text-purple-600">
            ${product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}