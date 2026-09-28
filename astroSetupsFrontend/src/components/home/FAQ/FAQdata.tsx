import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { FAQItem } from './faqTypes';
import { motion } from 'framer-motion';

const answerWrapper = (content: ReactNode) => (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: 'auto', opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="overflow-hidden"
  >
    {content}
  </motion.div>
);

export const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: '¿Qué métodos de pago aceptan?',
    answer: answerWrapper(
      <div className="space-y-2">
        <p>En AstroSetups Solutions, puedes pagar tu compra a través de los siguientes métodos:</p>
        <ul className="list-disc list-inside ml-4">
          <li>✅ Transferencia bancaria</li>
          <li>✅ Consignación</li>
          <li>✅ MercadoPago</li>
          <li>✅ PSE</li>
          <li>✅ Pago contra entrega</li>
        </ul>
        <p>
          Si presentas alguna duda adicional puedes hablar con nuestro equipo por WhatsApp tocando el siguiente link:{' '}
          <a
            href="https://wa.me/573001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 font-semibold underline hover:text-green-700"
          >
            Hablar con el equipo
          </a>.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    question: '¿Cuál es el precio del envío?',
    answer: answerWrapper(
      <div className="space-y-2">
        <p>📦 ¿Cuál es el costo del envío?</p>
        <p>El costo del envío es asumido por el cliente y depende de la transportadora.</p>
        <p>El valor a pagar corresponde al envío desde Medellín hasta su domicilio.</p>
        <p>Para envíos internacionales, ASTROSETUP SOLUTIONS asume el costo.</p>
        <p>
          Si tienes dudas, contáctanos por WhatsApp en la parte de abajo a la izquierda. 🚀💻
        </p>
      </div>
    ),
  },
  {
    id: 3,
    question: '📌 Seguro de la Mercancía',
    answer: answerWrapper(
      <div className="space-y-2">
        <p>La mercancía se asegura por el valor total de su costo.</p>
        <p>
          Si desea que su mercancía vaya asegurada por un valor mínimo o uno diferente al total
          para reducir costos de transporte, debe informarlo previamente.
        </p>
      </div>
    ),
  },
  {
    id: 4,
    question: '¿Donde están Ubicados?',
    answer: answerWrapper(
      <div className="space-y-2">
        <p>
          Nos encontramos en la zona suroccidental de Medellín y operamos a través de una bodega,
          ya que no contamos con una tienda física. Esto nos permite reducir costos operativos y
          ofrecer promociones más frecuentes a nuestros clientes.
        </p>
      </div>
    ),
  },
  {
    id: 5,
    question: '¿Cuánto es el tiempo de entrega?',
    answer: answerWrapper(
      <div className="space-y-2">
        <p>El tiempo de entrega depende del tipo de envío que elijas:</p>
        <p>📌 Envío Normal (productos importados):</p>
        <ul className="list-disc list-inside ml-4">
          <li>7 a 14 días debido al proceso de importación.</li>
          <li>Cuando el producto ingrese al país, te informaremos por correo electrónico o WhatsApp.</li>
          <li>Luego, se considera el tiempo de un envío express (1 a 4 días hábiles).</li>
        </ul>
        <p>📌 Envío Express:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Medellín: 1 a 4 días hábiles.</li>
          <li>Medellín: entrega inmediata, en el mismo día hábil o mas tardar el siguiente día hábil.</li>
          <li>Resto de ciudades: entrega en 1 a 4 días hábiles.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 6,
    question: '¿Hacen envíos a toda Colombia?',
    answer: answerWrapper(
      <div className="space-y-2">
        <p>📍 ¿Hacen envíos a toda Colombia?</p>
        <p>
          Sí, realizamos envíos a todo el país a través de las principales transportadoras,
          garantizando que tu pedido llegue en perfectas condiciones.
        </p>
        <p>Trabajamos con:</p>
        <ul className="list-disc list-inside ml-4">
          <li>🚚 ENVÍA, TCC, INTERRAPIDÍSIMO, COORDINADORA, entre otras.</li>
        </ul>
        <p>
          Tu equipo será embalado con la protección adecuada para asegurar su entrega en óptimas
          condiciones.
        </p>
        <p>
          Si tienes dudas, contáctanos por WhatsApp en la parte de abajo a la izquierda. 🚀💻
        </p>
      </div>
    ),
  },
  {
    id: 7,
    question: '¿Aceptan Addi o Sistecredito?',
    answer: answerWrapper(
      <div className="space-y-2">
        <p>
          Actualmente, no trabajamos con métodos de financiación como Addi o Sistecrédito, ya que
          nuestra estrategia de negocio se enfoca en ofrecer los mejores precios sin costos
          adicionales.
        </p>
      </div>
    ),
  },
  {
    id: 8,
    question: '¿Me pueden ayudar a armar mi computadora?',
    answer: answerWrapper(
      <div className="space-y-2">
        <p>¡Por supuesto! 🎉 Te ayudamos a diseñar una PC personalizada según tus necesidades.</p>
        <p>Solo debes llenar nuestro formulario, donde nos contarás:</p>
        <ul className="list-disc list-inside ml-4">
          <li>✅ Para qué necesitas tu computadora.</li>
          <li>✅ Qué actividades realizas en tu día a día.</li>
          <li>✅ Cuál es tu presupuesto.</li>
          <li>✅ Otros detalles importantes.</li>
        </ul>
        <p>
          📌 Haz clic aquí para llenar el formulario:{' '}
          <Link
            to="/custom-pc"
            className="text-purple-600 font-semibold underline hover:text-purple-700"
          >
            Tu computadora personalizada
          </Link>
          .
        </p>
        <p>
          Si tienes dudas, contáctanos por WhatsApp en la parte de abajo a la izquierda. 🚀💻
        </p>
      </div>
    ),
  },
  {
    id: 9,
    question: '¿Puedo potenciar mi computadora en el futuro?',
    answer: answerWrapper(
      <div className="space-y-2">
        <p>🔧 ¿Puedo potenciar mi computadora en el futuro?</p>
        <p>
          ¡Por supuesto! 🚀 Todas las computadoras armadas en AstroSetups Solutions están diseñadas
          para que puedas actualizar y mejorar sus componentes con el tiempo.
        </p>
        <p>Te ofrecemos la posibilidad de:</p>
        <ul className="list-disc list-inside ml-4">
          <li>✅ Actualizar hardware (procesador, tarjeta gráfica, memoria RAM, etc.).</li>
          <li>✅ Ampliar almacenamiento para mayor capacidad.</li>
          <li>✅ Mejorar el rendimiento con nuevas tecnologías.</li>
        </ul>
        <p>
          Así, cuando desees potenciar tu equipo, podrás hacerlo sin problemas. Si necesitas
          asesoría para futuras mejoras, ¡contáctanos en el boton de abajo a la izquierda! 💻⚡
        </p>
      </div>
    ),
  },
  {
    id: 10,
    question: '¿Cómo funciona AstroSetups Solutions?',
    answer: answerWrapper(
      <div className="space-y-2">
        <p>
          En AstroSetups Solutions, operamos bajo un modelo de negocio sin intermediarios, lo que
          nos permite ofrecer productos a precios más bajos sin comprometer la calidad.
        </p>
        <p>
          No nos limitamos por nuestro inventario; siempre que es posible, traemos productos con
          anticipación para reducir los tiempos de entrega. Sin embargo, esto no significa que
          estés limitado a nuestra disponibilidad, ya que puedes solicitar una gran variedad de
          productos, si buscas algún producto que no se encuentra listado, siéntete libre de
          contactarnos.
        </p>
        <p>
          Cuando realizas una compra, generamos la orden directamente con nuestros proveedores. El
          proceso de importación puede tardar entre 7 y 14 días en ingresar al país y llegar a
          nuestra bodega. Una vez recibido, lo inspeccionamos para asegurarnos de que esté en
          perfectas condiciones y luego lo despachamos a tu domicilio.
        </p>
        <p>Si te encuentras fuera de Medellín, el envío puede tardar 1 a 4 días adicionales.</p>
        <p>
          El único costo de envío que asumes es desde Medellín hasta tu domicilio, asegurando una
          compra confiable y accesible.
        </p>
      </div>
    ),
  },
];
