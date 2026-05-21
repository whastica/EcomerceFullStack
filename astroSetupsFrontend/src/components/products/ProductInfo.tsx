import { useState } from 'react';
import { toast } from 'sonner';
import { useCart } from '../../pages/cart/Cart';
import { ProductDetail }
  from '../../interfaces/product/product-detail.interface';

interface ProductInfoProps {
  product: ProductDetail;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);

  const finalPrice = product.effectivePrice ?? product.price;

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: finalPrice,
        imageUrl: product.imageUrl,
        quantity,
      },
    });
    toast.success(`"${product.name}" fue añadido al carrito 🛒`);
  };

  return (
    <div
      className="rounded-lg border border-gray-600 p-6 space-y-5"
      style={{ backgroundColor: '#4D4D4D' }}
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white leading-snug">
          {product.name}
        </h1>
        {product.brand && (
          <p className="text-sm text-gray-300 mt-1">{product.brand}</p>
        )}
        {/* Categoría — corregido: categoryName en lugar de category.name */}
        {product.categoryName && (
          <p className="text-sm text-gray-400 mt-1">
            Categoría: {product.categoryName}
          </p>
        )}
      </div>

      {/* Precio */}
      <div className="space-y-1">
        {product.hasDiscount && (
          <p className="text-lg text-gray-400 line-through">
            ${product.price.toLocaleString('es-CO')}
          </p>
        )}
        <p className="text-3xl font-bold" style={{ color: '#D6FF3C' }}>
          ${finalPrice.toLocaleString('es-CO')}
        </p>
        {product.hasDiscount && (
          <span className="text-xs text-red-400 font-semibold">
            ¡Precio con descuento!
          </span>
        )}
      </div>

      {/* Stock */}
      <p className={`text-sm font-medium ${(product.stock ?? 0) > 0 ? 'text-green-400' : 'text-red-400'}`}>
        {(product.stock ?? 0) > 0
          ? `${product.stock} unidades disponibles`
          : 'Sin stock'}
      </p>

      {/* Envío */}
      <div className="space-y-1">
        <p className="text-sm text-gray-300">Duración de envío</p>
        <select
          className="w-full rounded-md px-3 py-2 text-sm text-white border border-gray-500 outline-none focus:border-[#FB5607]"
          style={{ backgroundColor: '#3a3a3a' }}
          defaultValue="normal"
        >
          <option value="normal">Normal (7 a 14 días hábiles)</option>
          <option value="express">Express (3 a 5 días hábiles)</option>
        </select>
      </div>

      {/* Cantidad */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="w-9 h-9 rounded-md bg-gray-600 text-white text-lg font-bold hover:bg-[#FB5607] transition-colors"
        >
          -
        </button>
        <span className="w-10 text-center text-white font-semibold text-lg">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => Math.min(product.stock ?? 99, q + 1))}
          className="w-9 h-9 rounded-md bg-gray-600 text-white text-lg font-bold hover:bg-[#FB5607] transition-colors"
          disabled={quantity >= (product.stock ?? 99)}
        >
          +
        </button>
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          disabled={(product.stock ?? 0) === 0}
          className="flex-1 py-3 rounded-md font-bold text-white text-sm uppercase tracking-wide transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#FB5607' }}
        >
          Añadir al carrito
        </button>
        <button
          onClick={() => console.log(`Comprar ahora: ${product.name}`)}
          className="flex-1 py-3 rounded-md font-bold text-sm uppercase tracking-wide transition-opacity hover:opacity-90 border border-[#D6FF3C] text-black"
          style={{ backgroundColor: '#D6FF3C' }}
        >
          Comprar ahora
        </button>
      </div>

      {/* Descripción */}
      {product.description && (
        <p className="text-sm text-gray-300 leading-relaxed">
          {product.description}
        </p>
      )}
    </div>
  );
}