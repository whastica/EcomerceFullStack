import { useState } from 'react';
import { useCart } from '../../pages/cart/Cart';
import Container from '../../components/layout/container/Container';
import TrustBanner from './TrustBanner';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { state, dispatch } = useCart();
  const { items } = state;
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const handleRemove = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
  
  const handleValidateDiscount = () => {
    alert(`Código ingresado: ${discountCode}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-dark-tech-pattern text-dark-text relative">
      {/* Fondo decorativo animado */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-dark-gradient"></div>
        <div className="absolute inset-0 bg-geometric-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
        <div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            backgroundImage: 'linear-gradient(45deg, transparent 0%, #f3f4f6 200%)',
          }}
        />
      </div>
      
      <main className="flex-1 relative z-10">
        <Container padding="large" className="py-3">
          <h1 className="text-2xl font-bold text-dark-text mb-8">🛒 Tu Carrito</h1>
          
          {items.length === 0 ? (
            <div className="text-center text-dark-muted py-10 space-y-4">
              <p className="text-lg">Tu carrito está vacío.</p>
              <Link to="/products" className="text-purple-400 font-semibold hover:underline">
                Ver productos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              {/* Lista de productos */}
              <div className="lg:col-span-2 relative z-10">
                <div className="bg-[#4D4D4D] rounded-lg shadow p-6 text-white">
                  <div className="space-y-6">
                    {items.map((item, index) => (
                      <div key={item.id}>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full sm:w-32 h-32 object-contain rounded bg-white p-1"
                          />
                          <div className="flex-1 space-y-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-300">{item.brand}</p>
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center gap-2">
                                <label htmlFor={`qty-${item.id}`} className="text-sm" style={{ color: '#C5EC29' }}>
                                  Cantidad:
                                </label>
                                <input
                                  id={`qty-${item.id}`}
                                  type="number"
                                  min={1}
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                  className="w-16 px-2 py-1 border rounded text-sm text-black bg-white"
                                />
                              </div>
                              <div className="flex items-center gap-2 lg:pr-8">
                                <p className="text-white font-bold text-lg text-right min-w-[100px]">
                                  ${item.price.toLocaleString()}
                                </p>
                                <button
                                  onClick={() => handleRemove(item.id)}
                                  className="text-red-400 text-lg"
                                  title="Quitar producto"
                                >
                                  🗑️
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Separador entre productos, excepto el último */}
                        {index < items.length - 1 && (
                          <hr className="border-gray-600 mt-6" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Resumen del carrito con superposición */}
              <div className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:-translate-x-28 lg:w-[300px] xl:w-[340px] mt-6 lg:mt-0 z-20">
                <div className="bg-white rounded-lg shadow-xl p-6 space-y-6 h-fit text-gray-800">
                  <div className="text-center space-y-1">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <div className="text-lg font-bold">
                      ${subtotal.toLocaleString()}
                    </div>
                  </div>
                  
                  {!showDiscountInput ? (
                    <div className="text-center">
                      <button
                        onClick={() => setShowDiscountInput(true)}
                        className="text-xs underline font-medium"
                        style={{ color: '#F54A00' }}
                      >
                        Insertar código de descuento
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="Código de descuento"
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                      <button
                        onClick={handleValidateDiscount}
                        className="text-white text-sm py-2 px-4 rounded hover:brightness-110 transition"
                        style={{ backgroundColor: '#F54A00' }}
                      >
                        Validar código
                      </button>
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-3 pt-4">
                    <Link
                      to="/products"
                      className="text-center text-sm text-black hover:underline"
                    >
                      ← Seguir comprando
                    </Link>
                    <button
                      className="bg-[#FB5607] hover:bg-orange-600 text-white py-2 px-4 rounded text-sm font-medium transition"
                    >
                      Ir a pagar 💳
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
        <TrustBanner />
      </main>
    </div>
  );
}