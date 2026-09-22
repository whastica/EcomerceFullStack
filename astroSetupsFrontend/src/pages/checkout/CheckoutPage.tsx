import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '../cart/Cart';
import Container from '../../components/layout/container/Container';
import CheckoutForm from './Checkoutform';
import OrderSummary from './Ordersummary';
import { orderService } from '../../services/order.service';

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const { items } = state;
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ── Cambio de cantidad ── */
  const handleQtyChange = (id: number, delta: number) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQty } });
    }
  };

  /* ── Eliminar item ── */
  const handleRemove = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  /* ── Envío final del formulario ── */
  const handleFormSubmit = async (formData: {
    name: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    address1: string;
    address2?: string;
    zipCode: string;
    paymentMethod: string;
  }) => {
    if (!formData.name || !formData.email || !formData.address1) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    if (items.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }

    setIsSubmitting(true);

    try {
      await orderService.createOrder(items, formData);
      toast.success('¡Pedido realizado con éxito! 🎉');
      dispatch({ type: 'CLEAR_CART' });
      setTimeout(() => navigate('/'), 2000);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Error al crear el pedido';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Carrito vacío ── */
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-elegant-dark-diagonal-subtle flex items-center justify-center font-helvetica">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-dark-text">
            No hay productos en el carrito
          </h1>
          <button
            onClick={() => navigate('/catalog')}
            className="bg-[#CDFF00] text-dark-background font-bold px-8 py-4
                       rounded-lg hover:brightness-110 transition-all duration-200"
          >
            Ir a la tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-elegant-dark-diagonal-subtle py-12 font-helvetica">
      <Container padding="large">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 max-w-6xl mx-auto items-start">

          {/* Formulario multi-paso */}
          <CheckoutForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />

          {/* Resumen del pedido */}
          <OrderSummary
            items={items}
            onQtyChange={handleQtyChange}
            onRemove={handleRemove}
          />

        </div>
      </Container>
    </div>
  );
}
