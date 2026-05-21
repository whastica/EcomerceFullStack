import { Eye, ShoppingCart }
  from 'lucide-react';
import { useState }
  from 'react';
import { Link }
  from 'react-router-dom';
import { toast }
  from 'sonner';
import { useCart }
  from '../../pages/cart/Cart';
import ProductModal
  from './ProductModal';
import { ProductSummary }
  from '../../interfaces/product/product-summary.interface';

interface ProductCardProps {
  product: ProductSummary;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const [showModal, setShowModal] =
    useState(false);
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.effectivePrice ?? product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      },
    });
    toast.success(
      `"${product.name}" fue añadido al carrito 🛒`
    );
  };

  const finalPrice =
    product.effectivePrice ?? product.price;

  return (
    <>
      <Link
        to={`/product/${product.id}`}
        className="
          group
          relative
          block
          transition-all
          duration-300
          transform
          hover:-translate-y-1
          hover:scale-105
        "
      >
        <div className="relative overflow-hidden rounded-b-lg bg-transparent">
          {/* Imagen */}
          <div className="relative overflow-hidden bg-dark-card rounded-t-lg">
            <img
              src={
                product.imageUrl ||
                '/assets/products/placeholder.png'
              }
              alt={product.name}
              className="
                w-full
                object-contain
                aspect-[4/5]
                transition-transform
                duration-300
                group-hover:scale-110
                p-2
              "
            />
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/20
                via-transparent
                to-transparent
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-300
              "
            />
            {/* Badge descuento */}
            {product.hasDiscount && (
              <div
                className="
                  absolute
                  top-3
                  left-3
                  bg-red-500
                  text-white
                  text-xs
                  font-bold
                  px-2
                  py-1
                  rounded-md
                "
              >
                Oferta
              </div>
            )}
            {/* Acciones */}
            <div
              className="
                absolute
                top-3
                right-3
                flex
                flex-col
                gap-2
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-300
              "
            >
              {/* Vista previa */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowModal(true);
                }}
                className="
                  p-2
                  rounded-full
                  bg-gray-300
                  text-gray-700
                  hover:bg-[#FB5607]
                  hover:text-white
                  shadow-lg
                  transition-colors
                "
              >
                <Eye size={18} />
              </button>
              {/* Carrito */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className="
                  p-2
                  rounded-full
                  bg-gray-300
                  text-gray-700
                  hover:bg-[#FB5607]
                  hover:text-white
                  shadow-lg
                  transition-colors
                "
              >
                <ShoppingCart size={18} />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="p-4 text-center space-y-2">
            {/* Marca */}
            {product.brand && (
              <p className="text-xs text-dark-muted uppercase tracking-wide">
                {product.brand}
              </p>
            )}
            {/* Nombre */}
            <h3
              className="
                text-base
                font-semibold
                text-dark-text
                group-hover:text-[#FB5607]
                transition-colors
                duration-200
                line-clamp-2
              "
            >
              {product.name}
            </h3>
            {/* Precio */}
            <div className="flex flex-col items-center">
              {product.hasDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.price.toLocaleString()}
                </span>
              )}
              <p
                className="
                  text-lg
                  font-bold
                  transition-colors
                  duration-200
                "
                style={{ color: '#CAD519' }}
              >
                ${finalPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* Modal vista previa */}
      {showModal && (
        <ProductModal
          product={product}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}