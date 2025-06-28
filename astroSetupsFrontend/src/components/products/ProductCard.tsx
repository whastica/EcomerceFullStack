import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      aria-label={`Ver detalles de ${product.name}`}
      className="cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-transform duration-300 flex flex-col min-h-[360px] transform hover:scale-105 hover:ring-2 hover:ring-purple-200"
    >
      <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
          {product.brand && (
            <p className="text-xs text-gray-500 mt-1">{product.brand}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-base font-bold text-purple-600">
            ${product.price.toLocaleString()}
          </span>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded min-w-[90px] text-center ${
              product.isAvailable
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {product.isAvailable ? 'Disponible' : 'Agotado'}
          </span>
        </div>
      </div>
    </div>
  );
}