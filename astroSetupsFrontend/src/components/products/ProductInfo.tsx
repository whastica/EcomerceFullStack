import { ProductDetail } from '../../pages/products/ProductDetailPage';
import { useCart } from '../../pages/cart/Cart';
import { toast } from 'sonner';

interface ProductInfoProps {
  product: ProductDetail;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...product,
        quantity: 1, // Valor por defecto temporal
      },
    });

    toast.success(`"${product.name}" fue añadido al carrito 🛒`);
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <div className="flex items-center space-x-2 mt-2">
          {renderStars(product.rating)}
          {product.reviewCount && (
            <span className="text-gray-600 text-sm">({product.reviewCount} reseñas)</span>
          )}
        </div>
      </div>

      <p className="text-2xl font-semibold text-purple-700">
        ${product.price.toLocaleString()}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleAddToCart}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
        >
          Agregar al carrito
        </button>
        <button
          onClick={() => console.log(`Comprar ahora: ${product.name}`)}
          className="border border-purple-600 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-50 transition"
        >
          Comprar ahora
        </button>
      </div>
    </div>
  );
}