const TrackingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-app-gradient">
      <main className="flex-grow flex flex-col items-center py-10">
        <div className="bg-dark-panel text-white w-full max-w-4xl p-6 rounded-md text-center">
          <h1 className="text-[46px] font-bold font-montserrat">Rastrea tu Paquete</h1>
        </div>
        <a href="/" className="text-white underline text-center block mt-6">Volver al inicio</a>
        <div className="text-white max-w-4xl px-6 mt-6 text-center">
          <div className="border border-yellow-500/60 bg-yellow-500/10 rounded-xl p-8">
            <p className="text-2xl font-bold text-yellow-400 mb-2">🚧 En construcción</p>
            <p className="text-base font-montserrat leading-relaxed text-gray-200">
              La interfaz de rastreo de paquetes estará disponible próximamente. Muy pronto
              podrás ingresar tu número de seguimiento y conocer el estado de tu pedido en
              tiempo real.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrackingPage;
