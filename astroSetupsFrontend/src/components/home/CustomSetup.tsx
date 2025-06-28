import { Link } from 'react-router-dom';
import Container from '../layout/Container';

export default function CustomSetupSection() {
  return (
    <section
      className="w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/assets/relacionados/custom.webp')` }}
    >
      <div className="w-full h-full bg-gradient-to-r from-black/80 to-black/40">
        <Container padding="large" maxWidth="7xl" center={true} className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 text-white text-left">
            
            {/* Texto */}
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold leading-snug">
                ¿Estás necesitando un equipo pero no sabes cuál es el mejor para ti?
              </h2>
              <p className="text-lg leading-relaxed">
                Armamos la computadora indicada para lo que necesitas. Con los recursos específicos para correr los juegos y programas que utilizas.
              </p>
              <div>
                <Link
                  to="/customPc"
                  className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow transition"
                >
                  🛠️ Personaliza tu PC
                </Link>
              </div>
            </div>

            {/* Imagen lateral (opcional) */}
            <div className="hidden md:block">
              <img
                src="/assets/relacionados/casecustom1.png"
                alt="Setup personalizado"
                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
