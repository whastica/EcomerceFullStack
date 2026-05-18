// src/components/products/ProductModal.tsx

import { useEffect } from 'react';

import Container
  from '../layout/container/Container';

import ProductInfo
  from './ProductInfo';

import { ProductDetail }
  from '../../interfaces/product/product-detail.interface';

interface ProductModalProps {
  product: ProductDetail;
  onClose: () => void;
}

export default function ProductModal({
  product,
  onClose,
}: ProductModalProps) {

  /**
   * Cerrar modal con ESC
   */
  useEffect(() => {

    const handleEsc = (
      event: KeyboardEvent
    ) => {

      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener(
      'keydown',
      handleEsc
    );

    return () => {
      document.removeEventListener(
        'keydown',
        handleEsc
      );
    };

  }, [onClose]);



  /**
   * Click overlay
   */
  const handleOverlayClick = () => {
    onClose();
  };



  /**
   * Evitar cerrar modal
   */
  const handleModalClick = (
    event: React.MouseEvent
  ) => {

    event.stopPropagation();
  };



  return (

    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
      onClick={handleOverlayClick}
    >

      <div
        className="bg-dark-card rounded-lg shadow-xl max-w-4xl w-full mx-4 relative max-h-[90vh] overflow-y-auto"
        onClick={handleModalClick}
      >

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-dark-muted hover:text-white text-2xl"
        >
          ✕
        </button>



        <Container
          padding="large"
          className="py-8"
        >

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Imagen */}
            <div className="lg:col-span-6 flex justify-center">

              <img
                src={product.mainImageUrl}
                alt={product.name}
                className="w-full max-w-md h-auto rounded-xl shadow-lg object-contain"
              />

            </div>



            {/* Información */}
            <div className="lg:col-span-6">

              <ProductInfo
                product={product}
              />

            </div>

          </div>

        </Container>

      </div>

    </div>
  );
}