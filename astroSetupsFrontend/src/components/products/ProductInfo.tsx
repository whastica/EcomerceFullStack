import { useState } from 'react';
import { ProductDetail } from '../../pages/products/ProductDetailPage';
import { useCart } from '../../pages/cart/Cart';
import { toast } from 'sonner';

interface ProductInfoProps {
  product: ProductDetail;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...product,
        quantity,
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
    <div className="rounded-lg border border-gray-200 p-6 space-y-6" style={{ backgroundColor: '#4D4D4D' }}>
      <div>
        <h1 className="text-2xl font-bold text-white">{product.name}</h1>
        <p className="text-sm text-gray-300">{product.brand}</p>
        <div className="flex items-center space-x-2 mt-2">
          {renderStars(product.rating)}
          {product.reviewCount && (
            <span className="text-gray-200 text-sm">({product.reviewCount} reseñas)</span>
          )}
        </div>
      </div>

      <p className="text-2xl font-semibold" style={{ color: '#D6FF3C' }}>
        ${product.price.toLocaleString()}
      </p>

      <p className="text-sm text-gray-100 italic">Duración del envío: 7 a 15 días hábiles</p>

      <div className="flex items-center gap-2">
        <label htmlFor="quantity" className="text-white text-sm">Cantidad:</label>
        <input
          id="quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="w-16 px-2 py-1 rounded-md text-center text-black bg-white"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleAddToCart}
          className="text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105 shadow-md hover:shadow-lg"
          style={{ backgroundColor: '#FB5607', color: '#fff' }}
        >
          Agregar al carrito
        </button>
        <button
          onClick={() => console.log(`Comprar ahora: ${product.name}`)}
          className="border px-4 py-2 rounded-md transition-transform transform hover:scale-105 shadow-md hover:shadow-lg text-[#D6FF3C] border-[#D6FF3C] hover:bg-[#D6FF3C] hover:text-black"
          style={{ backgroundColor: '#D6FF3C', color: '#000' }}
        >
          Comprar ahora
        </button>
      </div>
    </div>
  );
}