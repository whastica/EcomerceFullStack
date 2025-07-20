import { Link } from 'react-router-dom';
import Container from '../layout/container/Container';

export default function CustomSetupSection() {
  return (
    <section
      className="w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/assets/relacionados/custom.webp')` }}
    >
      <div className="w-full h-full bg-gradient-to-r from-black/80 to-black/40">
        <Container
          padding="large"
          maxWidth="7xl"
          center={true}
          className="py-20 flex flex-col justify-between min-h-[600px] text-white"
        >
          {/* Contenido principal en grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
            {/* Texto alineado a la izquierda */}
            <div className="space-y-6 text-left">
              <h2 className="text-3xl font-extrabold leading-snug">
                ¿Estás necesitando un equipo pero no sabes cuál es el mejor para ti?
              </h2>
              <p className="text-lg leading-relaxed">
                Armamos la computadora indicada para lo que necesitas. Con los recursos específicos para correr los juegos y programas que utilizas.
              </p>
            </div>

            {/* Imagen lateral (visible en pantallas md en adelante) */}
            <div className="hidden md:flex justify-center">
              <img
                src="/assets/relacionados/Caasecustom.png"
                alt="Setup personalizado"
                className="rounded-lg shadow-lg w-full max-w-md"
              />
            </div>
          </div>

          {/* Botón centrado abajo del container */}
          <div className="mt-12 flex justify-center w-full">
            <Link
              to="/customPc"
              className="inline-block px-6 py-3 text-black hover:text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 active:shadow-md border-2 border-green-300"
              style={{
                backgroundColor: '#D6FF3C',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                boxShadow:
                  '0 4px 15px rgba(214, 255, 60, 0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  'linear-gradient(to right, #f97316, #ea580c)';
                e.currentTarget.style.boxShadow =
                  '0 4px 15px rgba(255,165,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#D6FF3C';
                e.currentTarget.style.boxShadow =
                  '0 4px 15px rgba(214, 255, 60, 0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)';
              }}
            >
              🛠️ Personaliza tu PC
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
}