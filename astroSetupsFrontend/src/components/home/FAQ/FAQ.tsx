'use client';

import { useState, forwardRef } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { FAQProps } from './faqTypes';
import { FAQ_DATA } from './faqData';

const FAQ = forwardRef<HTMLElement, FAQProps>(({ id }, ref) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = '573001234567';
    const message = encodeURIComponent('Hola, tengo una consulta sobre sus productos.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section ref={ref} id={id} className="py-16 bg-dark-background text-dark-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Columna izquierda - Contacto */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-8">
              <div className="bg-dark-card border border-dark-border rounded-xl p-8 text-center shadow-lg">
                <div className="w-16 h-16 bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-dark-text mb-4">¿Preguntas Frecuentes?</h3>
                <p className="text-sm text-dark-muted mb-4">
                  Te ayudamos a resolver las dudas sobre el proceso de compra, formas de pago, envíos, y todo lo necesario antes de adquirir un producto.
                </p>
                <h3 className="text-xl font-bold text-dark-text mb-4">¿Tienes más dudas?</h3>
                <p className="text-sm text-dark-muted mb-4">
                  Contacta a nuestro soporte y aclara tus dudas.
                </p>
                <button
                  onClick={handleWhatsAppContact}
                  className="w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                  style={{
                    backgroundColor: '#D6FF3C',
                    color: '#000',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                    boxShadow:
                      '0 4px 15px rgba(214, 255, 60, 0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, #f97316, #ea580c)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#D6FF3C';
                    e.currentTarget.style.color = '#000';
                  }}
                >
                  <MessageCircle className="h-5 w-5" />
                  Contactar con Soporte
                </button>
              </div>
            </div>
          </div>

          {/* Columna derecha - Preguntas */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="space-y-4">
              {FAQ_DATA.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-600/20 bg-[#4D4D4D] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:border-purple-500"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-500 transition-colors duration-200"
                    aria-expanded={openItems.includes(item.id)}
                  >
                    <span className="font-semibold text-white text-lg">{item.question}</span>
                    <span className="text-gray-300 hover:text-purple-400 transition-colors duration-200">
                      {openItems.includes(item.id) ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </span>
                  </button>
                  {openItems.includes(item.id) && (
                    <div className="px-6 pb-4 leading-relaxed border-t border-gray-600/20 bg-white text-black">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

FAQ.displayName = 'FAQ';
export default FAQ;