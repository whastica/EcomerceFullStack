// src/components/products/ProductInfo.tsx

import { useState } from 'react';

import { toast } from 'sonner';

import { useCart }
  from '../../pages/cart/Cart';

import { ProductDetail }
  from '../../interfaces/product/product-detail.interface';

interface ProductInfoProps {
  product: ProductDetail;
}

export default function ProductInfo({
  product,
}: ProductInfoProps) {

  const { dispatch } = useCart();

  const [quantity, setQuantity] =
    useState(1);



  /**
   * Precio final
   */
  const finalPrice =
    product.effectivePrice ??
    product.price;



  /**
   * Agregar carrito
   */
  const handleAddToCart = () => {

    dispatch({

      type: 'ADD_ITEM',

      payload: {
        ...product,
        quantity,
      },
    });

    toast.success(
      `"${product.name}" fue añadido al carrito 🛒`
    );
  };



  return (

    <div
      className="rounded-lg border border-gray-200 p-6 space-y-6"
      style={{
        backgroundColor: '#4D4D4D',
      }}
    >

      {/* Header */}
      <div>

        <h1 className="text-2xl font-bold text-white">
          {product.name}
        </h1>

        <p className="text-sm text-gray-300">
          {product.brand}
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Categoría:
          {' '}
          {product.category.name}
        </p>

      </div>



      {/* Precio */}
      <div className="space-y-2">

        {product.hasDiscount && (
          <p className="text-lg text-gray-400 line-through">
            ${product.price.toLocaleString()}
          </p>
        )}

        <p
          className="text-3xl font-bold"
          style={{
            color: '#D6FF3C',
          }}
        >
          ${finalPrice.toLocaleString()}
        </p>

      </div>



      {/* Variaciones */}
      {product.hasVariations && (

        <div className="text-sm text-yellow-300">
          Este producto tiene configuraciones
          o variaciones disponibles.
        </div>

      )}



      {/* Envío */}
      <p className="text-sm text-gray-100 italic">
        Duración del envío:
        {' '}
        7 a 15 días hábiles
      </p>



      {/* Cantidad */}
      <div className="flex items-center gap-2">

        <label
          htmlFor="quantity"
          className="text-white text-sm"
        >
          Cantidad:
        </label>

        <input
          id="quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Number(e.target.value)
            )
          }
          className="w-20 px-2 py-1 rounded-md text-center text-black bg-white"
        />

      </div>



      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-4">

        <button
          onClick={handleAddToCart}
          className="text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105 shadow-md hover:shadow-lg"
          style={{
            backgroundColor: '#FB5607',
          }}
        >
          Agregar al carrito
        </button>



        <button
          onClick={() =>
            console.log(
              `Comprar ahora: ${product.name}`
            )
          }
          className="border px-4 py-2 rounded-md transition-transform transform hover:scale-105 shadow-md hover:shadow-lg text-[#D6FF3C] border-[#D6FF3C] hover:bg-[#D6FF3C] hover:text-black"
          style={{
            backgroundColor: '#D6FF3C',
            color: '#000',
          }}
        >
          Comprar ahora
        </button>

      </div>

    </div>
  );
}