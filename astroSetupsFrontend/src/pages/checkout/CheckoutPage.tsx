import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../cart/Cart';
import Container from '../../components/layout/container/Container';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const { items } = state;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit-card'
  });

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 100000 ? 0 : 15000;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    // Simular proceso de pago
    toast.success('¡Pedido realizado con éxito! 🎉');
    
    // Limpiar carrito
    dispatch({ type: 'CLEAR_CART' });
    
    // Redirigir a página de confirmación o home
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-dark-tech-pattern text-dark-text">
        <Container padding="large" className="py-20">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">No hay productos en el carrito</h1>
            <button
              onClick={() => navigate('/catalog')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
            >
              Ir a la tienda
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-tech-pattern text-dark-text">
      <Container padding="large" className="py-10">
        <h1 className="text-3xl font-bold mb-8">💳 Finalizar Compra</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-[#4D4D4D] rounded-lg p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-white">Información de contacto</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-200">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded bg-white text-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-200">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded bg-white text-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-200">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded bg-white text-black"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 text-white">Dirección de envío</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-200">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded bg-white text-black"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-200">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded bg-white text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-200">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded bg-white text-black"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 text-white">Método de pago</h2>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded bg-white text-black"
                >
                  <option value="credit-card">Tarjeta de crédito</option>
                  <option value="debit-card">Tarjeta de débito</option>
                  <option value="pse">PSE</option>
                  <option value="cash">Pago contra entrega</option>
                </select>
              </div>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div>
            <div className="bg-white rounded-lg shadow-xl p-6 space-y-4 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800">Resumen del pedido</h2>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-700">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <hr className="border-gray-300" />

              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>{shipping === 0 ? 'GRATIS' : `$${shipping.toLocaleString()}`}</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-[#FB5607] hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
              >
                Confirmar pedido
              </button>

              <button
                type="button"
                onClick={() => navigate('/cart')}
                className="w-full text-gray-600 hover:text-gray-800 text-sm underline"
              >
                ← Volver al carrito
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}