import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../../components/layout/container/Container';
import ExploreProducts from '../../components/home/ExploreProducts';
import FormsAppModal from '../../components/customPC/FormsAppModal';

// Variante de botón reutilizada de la página "en construcción"
// (antes: "Explorar Catálogo")
const CTA_BUTTON_CLASSES =
  'px-8 py-4 bg-lime text-dark-background font-bold rounded-lg hover:brightness-110 transition-all duration-200 text-base';

export default function CustomPCPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <div className="min-h-screen text-dark-text flex flex-col relative bg-app-gradient">
      <div className="relative z-10 flex-1 flex flex-col">
        {/* ===== Hero ===== */}
        <Container padding="large" className="pt-10 sm:pt-16 pb-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-dark-text text-shadow-dark"
            >
              Juega, transmite, graba, diseña, edita....
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="mt-5 text-base sm:text-lg md:text-xl leading-relaxed text-dark-muted"
            >
              ¿No estás seguro de las características que debe tener tu
              computadora para que corra lo que necesitas?
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="mt-7 flex justify-center"
            >
              <span className="bg-lime text-dark-background text-sm sm:text-base font-semibold px-5 py-3 rounded-xl leading-snug max-w-2xl text-left sm:text-center shadow-lg shadow-lime/10">
                Desliza la pantalla, toca el botón y cuéntanos a través del
                formulario para qué la necesitas
              </span>
            </motion.div>
          </div>

          {/* Torres / gabinetes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="relative z-10 mt-8 sm:mt-10 flex justify-center"
          >
            <img
              src="/assets/relacionados/personalizacion.png"
              alt="Gabinetes y torres para personalizar tu PC"
              className="block w-full max-w-4xl h-auto"
            />
          </motion.div>
        </Container>

        {/* ===== CTA ===== */}
        <Container
          padding="large"
          className="text-center pt-8 sm:pt-12 pb-16 sm:pb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-dark-text text-shadow-dark max-w-4xl mx-auto"
          >
            ARMA TU PC A LA MEDIDA DE TUS NECESIDADES Y PRESUPUESTO
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="mt-8"
          >
            <button type="button" onClick={openForm} className={CTA_BUTTON_CLASSES}>
              QUIERO ARMAR MI PC
            </button>
          </motion.div>
        </Container>

        {/* ===== Explora nuestros productos ===== */}
        <ExploreProducts />

        {/* ===== Integración Forms.app ===== */}
        <FormsAppModal isOpen={isFormOpen} onClose={closeForm} />
      </div>
    </div>
  );
}
