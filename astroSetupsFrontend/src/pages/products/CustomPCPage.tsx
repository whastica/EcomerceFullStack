import { useNavigate } from 'react-router-dom';
import Container from '../../components/layout/container/Container';

export default function CustomPCPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-dark-text flex flex-col relative bg-elegant-dark-diagonal-subtle">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-dark-gradient" />
        <div className="absolute inset-0 bg-geometric-pattern opacity-30" />
        <div className="absolute inset-0 bg-tech-grid opacity-20" />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center">
        <Container padding="large">
          <div className="text-center space-y-8 max-w-lg mx-auto">
            <div className="text-6xl">🛠️</div>
            <h1 className="text-4xl font-bold text-dark-text">
              Personaliza tu PC
            </h1>
            <p className="text-lg text-dark-muted leading-relaxed">
              Estamos trabajando en una herramienta interactiva para que puedas
              configurar tu PC ideal seleccionando componentes compatibles entre sí.
            </p>
            <div className="bg-[#4D4D4D] border border-gray-600 rounded-xl p-6">
              <p className="text-sm text-gray-300">
                <span className="font-bold text-[#D6FF3C]">Próximamente</span> —
                Estaremos lanzando esta funcionalidad muy pronto. Mientras tanto,
                puedes explorar nuestro catálogo completo de productos.
              </p>
            </div>
            <button
              onClick={() => navigate('/catalog')}
              className="px-8 py-4 bg-[#CDFF00] text-dark-background font-bold rounded-lg
                         hover:brightness-110 transition-all duration-200 text-base"
            >
              Explorar Catálogo
            </button>
          </div>
        </Container>
      </div>
    </div>
  );
}
