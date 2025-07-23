import { FAQItem } from './faqTypes';
import { motion } from 'framer-motion';


export const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: '¿Qué métodos de pago aceptan?',
    answer: (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
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
              href="https://wa.me/573001234567?text=Hola,%20tengo%20una%20consulta%20sobre%20los%20métodos%20de%20pago."
              target="_blank"
              className="text-green-400 underline hover:text-green-500"
            >
              Hablar con el equipo
            </a>.
          </p>
        </div>
      </motion.div>
    ),
  },
  {
    id: 2,
    question: '¿Cómo personalizo mi computadora?',
    answer: (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p>Puedes personalizar tu computadora siguiendo estos pasos:</p>
        <ol className="list-decimal list-inside ml-4 space-y-1">
          <li>Haz clic en el botón "Arma tu PC" o ve a la sección de personalización.</li>
          <li>Selecciona los componentes que desees (procesador, tarjeta gráfica, memoria, etc.).</li>
          <li>Agrega tu configuración al carrito y realiza la compra.</li>
        </ol>
        <p>Si no estás seguro de qué elegir, nuestro equipo puede asesorarte.</p>
      </motion.div>
    ),
  },
  {
    id: 3,
    question: '¿Realizan envíos a todo el país?',
    answer: (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p>Sí, hacemos envíos a cualquier lugar de Colombia. Trabajamos con transportadoras confiables para asegurar la entrega segura y rápida de tu pedido.</p>
      </motion.div>
    ),
  },
  {
    id: 4,
    question: '¿Cuánto tiempo tarda en llegar mi pedido?',
    answer: (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p>El tiempo de entrega depende de tu ubicación, pero generalmente toma entre 2 y 5 días hábiles. Para configuraciones personalizadas, puede tardar un poco más debido al ensamble y pruebas.</p>
      </motion.div>
    ),
  },
  {
    id: 5,
    question: '¿Tienen garantía los productos?',
    answer: (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p>Sí. Todos nuestros productos tienen garantía del fabricante y nosotros brindamos soporte en caso de inconvenientes. La duración depende del componente, pero suele ser de 1 año o más.</p>
      </motion.div>
    ),
  },
  {
    id: 6,
    question: '¿Cómo puedo contactarlos?',
    answer: (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p>Puedes contactarnos por:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Email: contacto@astrosetups.com</li>
          <li>WhatsApp: <a href="https://wa.me/573001234567" className="text-green-400 underline">Click aquí</a></li>
          <li>Instagram: <a href="https://instagram.com/astrosetups" className="text-blue-400 underline">@astrosetups</a></li>
        </ul>
      </motion.div>
    ),
  },
  {
    id: 7,
    question: '¿Qué pasa si tengo un problema con mi pedido?',
    answer: (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p>No te preocupes. Nuestro equipo de soporte está preparado para ayudarte en caso de problemas. Solo debes contactarnos por cualquiera de nuestros canales y solucionaremos tu caso lo más rápido posible.</p>
      </motion.div>
    ),
  },
  {
    id: 8,
    question: '¿Ofrecen asesoría para elegir componentes?',
    answer: (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p>¡Sí! Puedes escribirnos para recibir asesoría personalizada según tu presupuesto y necesidades. Nuestro equipo te guiará para armar la mejor configuración posible.</p>
      </motion.div>
    ),
  },
  {
    id: 9,
    question: '¿Qué marcas manejan?',
    answer: (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p>Trabajamos con marcas reconocidas a nivel mundial como:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Intel, AMD, Nvidia</li>
          <li>ASUS, MSI, Gigabyte</li>
          <li>Corsair, Kingston, Western Digital y muchas más</li>
        </ul>
      </motion.div>
    ),
  },
];
