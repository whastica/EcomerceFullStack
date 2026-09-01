import { useState } from 'react';

const FREE_SHIPPING_THRESHOLD = 500000;
const SHIPPING_COST = 25000;
const IVA_RATE = 0.19;

/* ── Icono basura ── */
const TrashIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21
         c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673
         a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0
         01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108
         0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165
         m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916
         c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0
         c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0
         a48.667 48.667 0 00-7.5 0" />
  </svg>
);

/* ── Divider interno ── */
const Divider = () => <div className="h-px bg-gray-200 my-3" />;

/**
 * OrderSummary
 *
 * Props:
 *   items    — array de productos del carrito
 *   onQtyChange(id, delta) — callback para cambiar cantidad
 *   onRemove(id)           — callback para eliminar item
 */
const OrderSummary: React.FC<OrderSummaryProps> = ({ items, onQtyChange, onRemove }) => {
  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  /* ── Cálculos ── */
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const iva = Math.round(subtotal * IVA_RATE);
  const total = subtotal + shipping;
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="bg-white rounded-2xl p-6 text-gray-900 self-start shadow-lg font-helvetica">

      <h2 className="text-base font-bold text-gray-900 mb-4">Resumen del pedido</h2>

      {/* ── Lista de productos ── */}
      {items.map((item) => (
        <div key={item.id} className="flex gap-3 mb-5 items-start">

          {/* Thumbnail */}
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
            {item.imageUrl
              ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              : (
                <div className="w-full h-full flex items-center justify-center text-2xl bg-gray-100">
                  📦
                </div>
              )
            }
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-900 leading-snug mb-1.5">
              {item.name}
            </p>

            {/* Badges */}
            <div className="flex items-center gap-1.5 flex-wrap mb-2">
              <span className="text-[11px] text-gray-500 bg-gray-100 rounded px-1.5 py-0.5">
                Normal (7 a 14 días hábiles)
              </span>
              <button
                type="button"
                className="text-[11px] font-bold text-white bg-red-500 border-none
                           rounded px-1.5 py-0.5 cursor-pointer hover:bg-red-600
                           transition-colors duration-150 tracking-wide"
              >
                ELIMINAR
              </button>
            </div>

            {/* Cantidad */}
            <div className="flex items-center border border-gray-300 rounded w-fit">
              <button
                type="button"
                onClick={() => onQtyChange(item.id, -1)}
                className="bg-transparent border-none px-2.5 py-1 text-base text-gray-700
                           cursor-pointer hover:bg-gray-100 transition-colors duration-150 rounded-l"
              >
                −
              </button>
              <span className="px-3 py-1 text-sm text-gray-900 border-l border-r
                               border-gray-300 min-w-[28px] text-center">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => onQtyChange(item.id, 1)}
                className="bg-transparent border-none px-2.5 py-1 text-base text-gray-700
                           cursor-pointer hover:bg-gray-100 transition-colors duration-150 rounded-r"
              >
                +
              </button>
            </div>
          </div>

          {/* Precio + eliminar */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="text-sm font-bold text-gray-900">
              ${(item.price * item.quantity).toLocaleString('es-CO')}
            </span>
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="text-gray-400 hover:text-red-500 bg-transparent border-none
                         cursor-pointer p-0.5 transition-colors duration-150"
              aria-label="Eliminar producto"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      ))}

      <Divider />

      {/* ── Subtotal / Envío ── */}
      <div className="space-y-1.5 mb-1">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Subtotal:</span>
          <span className="text-sm font-semibold text-gray-900">
            ${subtotal.toLocaleString('es-CO')}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Envío:</span>
          <span className="text-sm font-semibold text-gray-900">
            {shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString('es-CO')}`}
          </span>
        </div>
      </div>

      {/* ── IVA ── */}
      <div className="mb-3 mt-1">
        <p className="text-xs text-gray-400">Impuesto incluido:</p>
        <p className="text-xs text-gray-400">IVA (19%): ${iva.toLocaleString('es-CO')}</p>
      </div>

      <Divider />

      {/* ── Código promocional ── */}
      <button
        type="button"
        onClick={() => setShowPromo(v => !v)}
        className="text-red-500 text-xs underline underline-offset-2 bg-transparent
                   border-none cursor-pointer p-0 hover:text-red-600 transition-colors"
      >
        Insertar código promocional
      </button>

      {showPromo && (
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Código promo"
            value={promoCode}
            onChange={e => setPromoCode(e.target.value)}
            className="flex-1 !bg-gray-100 !border-gray-300 !text-gray-900 !text-sm !py-2"
          />
          <button
            type="button"
            className="bg-gray-900 text-white border-none rounded-lg px-3 py-2
                       text-xs font-bold cursor-pointer hover:bg-gray-700
                       transition-colors duration-150"
          >
            Aplicar
          </button>
        </div>
      )}

      <Divider />

      {/* ── Barra de envío gratis ── */}
      {shipping > 0 ? (
        <div className="mb-2">
          <p className="text-xs text-gray-600 mb-2 leading-snug">
            Añade{' '}
            <strong className="text-gray-900">${remaining.toLocaleString('es-CO')}</strong>
            {' '}más a tu compra y consigue{' '}
            <strong className="text-gray-900">ENVÍO GRATIS</strong>
          </p>
          <div className="relative h-2.5 bg-gray-200 rounded-full overflow-visible">
            <div
              className="h-2.5 bg-red-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
            <span className="absolute -top-6 right-0 text-[11px] font-bold text-white
                             bg-gray-500 rounded px-1 py-px">
              {progress}%
            </span>
          </div>
        </div>
      ) : (
        <p className="text-xs font-bold text-green-600 mb-2">
          ✓ ¡Tienes ENVÍO GRATIS!
        </p>
      )}

      <Divider />

      {/* ── Total ── */}
      <div className="flex justify-between items-baseline">
        <span className="text-sm text-gray-500 font-medium">Total:</span>
        <span className="text-2xl font-black text-gray-900">
          ${total.toLocaleString('es-CO')}
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;

/* Final fixes for type issues */
import { CartItem as CartItemFromCart } from '../cart/Cart';

interface CartItem extends CartItemFromCart {
  image?: string;
}

interface OrderSummaryProps {
  items: CartItem[];
  onQtyChange: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}