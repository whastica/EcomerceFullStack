'use client';
import { useState, forwardRef } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

interface FAQProps {
  id?: string;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos pagos con tarjetas de crédito y débito (Visa, Mastercard, American Express), PSE, transferencias bancarias, Nequi, Daviplata y pago contraentrega en algunas ciudades principales.',
  },
  {
    id: 2,
    question: '¿Cuál es el precio del envío?',
    answer: 'El costo de envío varía según la ciudad y el peso del producto. Los envíos a Bogotá, Medellín, Cali y Barranquilla tienen un costo de $12.000. Para otras ciudades el costo puede variar entre $15.000 y $25.000. Envío gratis en compras superiores a $200.000.',
  },
  {
    id: 3,
    question: '¿Dónde están ubicados?',
    answer: 'Nuestra sede principal está ubicada en Popayán, Cauca. Contamos con puntos de distribución en las principales ciudades del país para garantizar entregas rápidas y seguras.',
  },
  {
    id: 4,
    question: '¿Cuánto es el tiempo de entrega?',
    answer: 'En Popayán y ciudades cercanas: 1-2 días hábiles. Ciudades principales: 2-4 días hábiles. Otras ciudades: 3-7 días hábiles.',
  },
  {
    id: 5,
    question: '¿Hacen envíos a toda Colombia?',
    answer: 'Sí, realizamos envíos a todo el territorio nacional. Trabajamos con las principales transportadoras del país.',
  },
];

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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark-text mb-4">Preguntas Frecuentes</h2>
          <p className="text-lg text-dark-muted max-w-2xl mx-auto">
            Encuentra respuestas rápidas a las consultas más comunes sobre nuestros productos y servicios.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Columna izquierda - Contacto */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-8">
              <div className="bg-dark-card border border-dark-border rounded-xl p-8 text-center shadow-lg">
                <div className="w-16 h-16 bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-dark-text mb-4">
                  ¿Tienes más dudas?
                </h3>
                <p className="text-sm text-dark-muted mb-4">
                  Contacta a nuestro soporte y aclara tus dudas.
                </p>
                <button
                  onClick={handleWhatsAppContact}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
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
                  className="border border-dark-border bg-dark-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:border-purple-500"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-dark-surface transition-colors duration-200"
                    aria-expanded={openItems.includes(item.id)}
                  >
                    <span className="font-semibold text-dark-text text-lg">
                      {item.question}
                    </span>
                    <span className="text-dark-muted group-hover:text-purple-400 transition-colors duration-200">
                      {openItems.includes(item.id) ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </span>
                  </button>
                  {openItems.includes(item.id) && (
                    <div className="px-6 pb-4 text-dark-muted leading-relaxed border-t border-dark-border bg-dark-surface">
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