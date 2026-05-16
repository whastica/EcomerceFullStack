import { useState } from 'react';

/* ── Iconos ── */
const ShieldIcon = () => (
  <svg className="w-7 h-7 text-dark-muted shrink-0 mt-0.5" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6
         11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623
         5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152
         c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-7 h-7 text-dark-muted shrink-0 mt-0.5" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5
         a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75
         a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

/* ── Clases reutilizables para inputs de fondo blanco ── */
const inputClass =
  'w-full bg-white border border-light-border text-light-text placeholder-light-muted ' +
  'rounded-lg px-4 py-3 text-sm outline-none ' +
  'focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 ' +
  'hover:border-gray-400 transition-all duration-200';

const STEPS = [
  { id: 1, label: 'Información del Cliente' },
  { id: 2, label: 'Dirección' },
  { id: 3, label: 'Detalles de Facturación' },
];

const INITIAL_FORM = {
  name: '', email: '', phone: '',
  country: '', state: '', city: '',
  address1: '', address2: '', zipCode: '',
  billingAddress: false,
  paymentMethod: 'credit-card',
  cardNumber: '', cardHolder: '', cardExpiry: '', cardCVV: '',
};

/**
 * CheckoutForm
 *
 * Props:
 *   onSubmit(formData) — llamado cuando el usuario completa el paso 3
 */
export default function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeStep < 3) {
      setActiveStep((s) => s + 1);
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="font-helvetica">

      {/* ── Barra de pasos ── */}
      <div className="flex items-start gap-2 mb-10 flex-wrap">
        {STEPS.map((step, idx) => (
          <div key={step.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveStep(step.id)}
              className={`
                text-sm font-bold leading-snug pb-1 bg-transparent border-x-0 border-t-0
                cursor-pointer transition-all duration-200
                ${activeStep === step.id
                  ? 'text-dark-text border-b-2 border-red-500'
                  : 'text-dark-border border-b-2 border-transparent hover:text-dark-muted'
                }
              `}
            >
              {step.label}
            </button>
            {idx < STEPS.length - 1 && (
              <span className="text-dark-border text-base select-none">→</span>
            )}
          </div>
        ))}
      </div>

      {/* ── Formulario ── */}
      <form onSubmit={handleSubmit}>

        {/* PASO 1 — Datos del cliente */}
        {activeStep === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold text-dark-text mb-2">Datos del cliente</h2>
            <div className="h-px bg-dark-border mb-6" />

            <div className="flex flex-col gap-3 mb-5">
              <input
                type="text" name="name" placeholder="Nombre completo"
                value={formData.name} onChange={handleChange}
                className={inputClass} required
              />
              <input
                type="email" name="email" placeholder="Correo electrónico"
                value={formData.email} onChange={handleChange}
                className={inputClass} required
              />
              <input
                type="tel" name="phone" placeholder="Teléfono"
                value={formData.phone} onChange={handleChange}
                className={inputClass}
              />
            </div>

            <p className="text-sm text-dark-muted mb-3">
              ¿Ya tienes una cuenta?{' '}
              <a href="/login" className="text-red-500 font-semibold hover:underline">
                Iniciar sesión
              </a>
            </p>
            <p className="text-sm font-bold text-dark-text mb-6">Reembolsos</p>
          </div>
        )}

        {/* PASO 2 — Dirección de envío */}
        {activeStep === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold text-dark-text mb-2">Dirección de envío</h2>
            <div className="h-px bg-dark-border mb-6" />

            <div className="flex flex-col gap-3 mb-5">
              <input type="text" name="country" placeholder="País"
                value={formData.country} onChange={handleChange}
                className={inputClass} required />
              <input type="text" name="state" placeholder="Departamento / Provincia"
                value={formData.state} onChange={handleChange}
                className={inputClass} required />
              <input type="text" name="city" placeholder="Ciudad"
                value={formData.city} onChange={handleChange}
                className={inputClass} required />
              <input type="text" name="address1" placeholder="Dirección línea 1"
                value={formData.address1} onChange={handleChange}
                className={inputClass} required />
              <input type="text" name="address2" placeholder="Dirección línea 2 (opcional)"
                value={formData.address2} onChange={handleChange}
                className={inputClass} />
              <input type="text" name="zipCode" placeholder="Código postal"
                value={formData.zipCode} onChange={handleChange}
                className={inputClass} />
            </div>
          </div>
        )}

        {/* PASO 3 — Facturación y pago */}
        {activeStep === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold text-dark-text mb-2">Detalles de Facturación</h2>
            <div className="h-px bg-dark-border mb-6" />

            <div className="flex flex-col gap-3 mb-5">
              <select
                name="paymentMethod" value={formData.paymentMethod}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
                required
              >
                <option value="credit-card">Tarjeta de crédito / débito</option>
                <option value="pse">PSE</option>
                <option value="paypal">PayPal</option>
                <option value="mercado-pago">Mercado Pago</option>
                <option value="cash-on-delivery">Contra entrega</option>
              </select>

              {formData.paymentMethod === 'credit-card' && (
                <>
                  <input type="text" name="cardNumber" placeholder="Número de tarjeta"
                    value={formData.cardNumber} onChange={handleChange}
                    className={inputClass} maxLength={19} />
                  <input type="text" name="cardHolder" placeholder="Titular de la tarjeta"
                    value={formData.cardHolder} onChange={handleChange}
                    className={inputClass} />
                  <div className="flex gap-3">
                    <input type="text" name="cardExpiry" placeholder="MM / AA"
                      value={formData.cardExpiry} onChange={handleChange}
                      className={`${inputClass} flex-1`} maxLength={7} />
                    <input type="text" name="cardCVV" placeholder="CVV"
                      value={formData.cardCVV} onChange={handleChange}
                      className={`${inputClass} flex-1`} maxLength={4} />
                  </div>
                </>
              )}

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox" name="billingAddress"
                  checked={formData.billingAddress} onChange={handleChange}
                  className="accent-[#CDFF00] w-4 h-4 shrink-0"
                />
                <span className="text-sm text-dark-muted">
                  Mi dirección de facturación es diferente a la de envío
                </span>
              </label>
            </div>
          </div>
        )}

        {/* ── Botones de navegación ── */}
        <div className="flex gap-3 mt-2">
          {activeStep > 1 && (
            <button
              type="button"
              onClick={() => setActiveStep(s => s - 1)}
              className="border border-dark-border text-dark-muted bg-transparent px-5 py-4
                         rounded-lg text-sm hover:border-dark-muted hover:text-dark-text
                         transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              ← Anterior
            </button>
          )}
          <button
            type="submit"
            className="flex-1 bg-[#CDFF00] text-dark-background font-bold text-base
                       py-4 rounded-lg hover:brightness-110 transition-all duration-200
                       cursor-pointer tracking-wide"
          >
            {activeStep === 3 ? 'Realizar Pedido' : 'Continuar →'}
          </button>
        </div>
      </form>

      {/* ── Badges de confianza ── */}
      <div className="flex gap-8 mt-8">
        <div className="flex items-start gap-2">
          <ShieldIcon />
          <span className="text-xs text-dark-muted leading-snug">
            Compra Asegurada<br />Verificada
          </span>
        </div>
        <div className="flex items-start gap-2">
          <LockIcon />
          <span className="text-xs text-dark-muted leading-snug">
            Asegurado con una<br />encriptación de 256-bit
          </span>
        </div>
      </div>
    </div>
  );
}

/* Fixed type issues */
interface CheckoutFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
}