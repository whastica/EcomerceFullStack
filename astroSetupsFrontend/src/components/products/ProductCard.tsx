// src/components/products/ProductCard.tsx
import { Eye, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../pages/cart/Cart";
import { toast } from "sonner";
import ProductModal from "./ProductModal"; // 👈 importamos tu modal

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  brand: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        ...product,
        quantity: 1,
      },
    });

    toast.success(`"${product.name}" fue añadido al carrito 🛒`);
  };

  return (
    <>
      <Link
        to={`/product/${product.id}`}
        className="group relative block transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
      >
        <div className="relative overflow-hidden rounded-b-lg bg-transparent">
          {/* Imagen */}
          <div className="relative overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full object-cover aspect-[4/5] transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* 🔥 Overlay con botones */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Botón: abrir modal */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowModal(true);
                }}
                className="p-2 rounded-full bg-gray-300 text-gray-700 hover:bg-[#FB5607] hover:text-white shadow-lg transition-colors"
              >
                <Eye size={18} />
              </button>

              {/* Botón: agregar al carrito */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className="p-2 rounded-full bg-gray-300 text-gray-700 hover:bg-[#FB5607] hover:text-white shadow-lg transition-colors"
              >
                <ShoppingCart size={18} />
              </button>
            </div>
          </div>

          {/* Info básica */}
          <div className="p-4 text-center space-y-2">
            <h3 className="text-base font-semibold text-dark-text group-hover:text-[#FB5607] transition-colors duration-200 line-clamp-2">
              {product.name}
            </h3>
            <p
              className="text-lg font-bold transition-colors duration-200"
              style={{ color: "#CAD519" }}
            >
              ${product.price.toLocaleString()}
            </p>
          </div>
        </div>
      </Link>

      {/* Modal de detalle con ProductInfo */}
      {showModal && (
        <ProductModal
          product={product} // 👈 pasamos el mismo producto
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}