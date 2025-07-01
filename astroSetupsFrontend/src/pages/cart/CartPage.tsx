import { useCart } from '../../pages/cart/Cart';
import Container from '../../components/layout/Container';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/footer';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { state, dispatch } = useCart();
  const { items } = state;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const handleRemove = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ✅ Navbar al inicio */}
      <Navbar
        cartItemCount={items.length}
        isAuthenticated={true}
        userRole="CLIENT"
        userName="Usuario"
      />

      <main className="flex-1">
        <Container padding="large" className="py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">🛒 Tu Carrito</h1>

          {items.length === 0 ? (
            <div className="text-center text-gray-600 py-20 space-y-4">
              <p className="text-lg">Tu carrito está vacío.</p>
              <Link to="/products" className="text-purple-600 font-semibold hover:underline">
                Ver productos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lista de productos */}
              <div className="lg:col-span-2 space-y-6">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row gap-4"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full sm:w-32 h-32 object-contain rounded"
                    />
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <p className="text-purple-600 font-bold text-lg">
                        ${item.price.toLocaleString()}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <label htmlFor={`qty-${item.id}`} className="text-sm">Cantidad:</label>
                        <input
                          id={`qty-${item.id}`}
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                          className="w-16 px-2 py-1 border rounded text-sm"
                        />
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-red-500 text-sm hover:underline ml-2"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumen del carrito */}
              <div className="bg-white rounded-lg shadow p-6 space-y-4 h-fit">
                <h2 className="text-lg font-semibold text-gray-800">Resumen</h2>

                <div className="flex justify-between text-sm text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toLocaleString()}</span>
                </div>

                <input
                  type="text"
                  placeholder="Código de descuento"
                  className="w-full px-3 py-2 border rounded text-sm mt-2"
                />

                <div className="flex flex-col gap-3 pt-4">
                  <Link
                    to="/products"
                    className="text-center text-sm text-purple-600 hover:underline"
                  >
                    ← Seguir comprando
                  </Link>
                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded text-sm font-medium transition"
                  >
                    Ir a pagar 💳
                  </button>
                </div>
              </div>
            </div>
          )}
        </Container>
      </main>

      {/* ✅ Footer al final */}
      <Footer />
    </div>
  );
}