import { useEffect, useState } from 'react';
import { useCart } from '../../pages/cart/Cart';
import { toast } from 'sonner';
import { ProductSummary }
  from '../../interfaces/product/product-summary.interface';

interface ProductModalProps {
  product: ProductSummary;
  onClose: () => void;
}

export default function ProductModal({
  product,
  onClose,
}: ProductModalProps) {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);

  const finalPrice = product.effectivePrice ?? product.price;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

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
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
      onClick={onClose}
    >
      <div
        className="rounded-xl shadow-2xl w-full max-w-3xl mx-4 relative max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: '#4D4D4D' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl z-10 leading-none"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

          {/* Columna izquierda — imagen */}
          <div
            className="flex flex-col items-center justify-center p-6 rounded-tl-xl rounded-bl-xl"
            style={{ backgroundColor: '#3a3a3a' }}
          >
            {/* Imagen principal */}
            <div className="w-full flex items-center justify-center h-56">
              <img
                src={product.imageUrl || '/assets/products/placeholder.png'}
                alt={product.name}
                className="max-h-56 w-full object-contain"
              />
            </div>

            {/* Miniaturas — por ahora solo una */}
            <div className="flex gap-2 mt-4">
              <div
                className="w-16 h-16 rounded-md border-2 border-[#FB5607] flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: '#4D4D4D' }}
              >
                <img
                  src={product.imageUrl || '/assets/products/placeholder.png'}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Columna derecha — info */}
          <div className="p-6 space-y-4 flex flex-col justify-center">

            {/* Nombre */}
            <h2
              className="text-xl font-bold leading-snug"
              style={{ color: '#CAD519' }}
            >
              {product.name}
            </h2>

            {/* Precio */}
            <div>
              {product.hasDiscount && (
                <p className="text-sm text-gray-400 line-through">
                  ${product.price.toLocaleString('es-CO')}
                </p>
              )}
              <p className="text-3xl font-bold text-white">
                ${finalPrice.toLocaleString('es-CO')}
              </p>
            </div>

            {/* Ver detalles */}
            <a
              href={`/product/${product.id}`}
              className="text-sm text-[#FB5607] hover:underline w-fit"
            >
              Ver detalles
            </a>

            {/* Duración de envío */}
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
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="w-9 h-9 rounded-md bg-gray-600 text-white text-lg font-bold hover:bg-[#FB5607] transition-colors"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>

            {/* Stock */}
            <p className={`text-xs font-medium ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {product.stock > 0 ? `${product.stock} unidades disponibles` : 'Sin stock'}
            </p>

            {/* Botón añadir al carrito */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full py-3 rounded-md font-bold text-white text-sm uppercase tracking-wide transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#FB5607' }}
            >
              Añadir al carrito
            </button>

            {/* Descripción corta */}
            {product.description && (
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                {product.description}
              </p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}