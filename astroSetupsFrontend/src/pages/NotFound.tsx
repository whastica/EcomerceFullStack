import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-app-gradient">
      <main className="flex-grow flex flex-col items-center py-10">
        <div className="bg-dark-panel text-white w-full max-w-4xl p-6 rounded-md text-center">
          <h1 className="text-[64px] font-bold font-montserrat text-brand">404</h1>
          <p className="text-xl font-montserrat">Página no encontrada</p>
        </div>
        <div className="text-white max-w-4xl px-6 mt-6 text-center">
          <div className="border border-yellow-500/60 bg-yellow-500/10 rounded-xl p-8">
            <p className="text-base font-montserrat leading-relaxed text-gray-200">
              La página que buscas no existe o fue movida. Puedes volver al inicio
              o explorar nuestro catálogo de productos.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              to="/"
              className="px-5 py-2 rounded-md bg-brand hover:bg-brand-light text-white font-montserrat transition-colors"
            >
              Volver al inicio
            </Link>
            <Link
              to="/catalog"
              className="px-5 py-2 rounded-md border border-white/30 hover:bg-white/10 text-white font-montserrat transition-colors"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
