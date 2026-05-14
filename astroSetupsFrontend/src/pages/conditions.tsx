const PrivacyPolicies = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-grow flex flex-col items-center py-10">
        <div className="bg-[#4D4D4D] text-white w-full max-w-4xl p-6 rounded-md text-center">
          <h1 className="text-[46px] font-bold font-montserrat">Condiciones de Uso y Garantías</h1>
        </div>
        <a href="/" className="text-white underline text-center block mt-6">Volver al inicio</a>
        <div className="text-white max-w-4xl px-6 mt-6 font-montserrat">
        {/* Horario de Atención */}
        <div className="bg-[#3a3a3a] p-4 rounded-lg border-l-4 border-[#D7FE3B] mb-6">
            <h2 className="text-lg font-bold flex items-center">
            <span className="mr-2">📅</span> Horario de Atención para Garantías
            </h2>
            <p className="text-base mt-1 leading-relaxed">
            Atendemos solicitudes de garantía de lunes a viernes en el horario de <span className="font-bold text-[#D7FE3B]">10:00 a.m. a 4:00 p.m.</span>
            </p>
        </div>

        {/* Tiempo de Garantía */}
        <section className="mb-6">
            <h2 className="text-lg font-bold flex items-center mb-2">
            <span className="mr-2">⏳</span> Tiempo de Garantía
            </h2>
            <p className="text-base leading-relaxed text-gray-300">
            El tiempo de garantía varía según el fabricante, producto y marca. Al momento de la compra, se le informará al cliente el período exacto de garantía aplicable.
            </p>
        </section>

        {/* Condiciones */}
        <section className="mb-6">
            <h2 className="text-lg font-bold flex items-center mb-2">
            <span className="mr-2">📌</span> Condiciones de la Garantía
            </h2>
            <p className="mb-2 italic text-gray-400">Para solicitar una garantía, debes presentar:</p>
            <ul className="space-y-2 ml-2">
            <li className="flex items-start font-medium">
                <span className="text-[#D7FE3B] mr-2">✅</span> Factura de compra original.
            </li>
            <li className="flex items-start font-medium">
                <span className="text-[#D7FE3B] mr-2">✅</span> Producto con todos sus accesorios, empaques y manuales completos.
            </li>
            </ul>
        </section>

        {/* Opciones de Garantía */}
        <section className="mb-6 bg-[#444444] p-5 rounded-xl border border-gray-600">
            <h3 className="font-bold mb-4 text-[#D7FE3B] uppercase tracking-wider text-sm text-center">Opciones en caso de garantía aprobada</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3">
                <div className="text-2xl mb-1">🔄</div>
                <p className="text-xs font-bold uppercase mb-1">Reparación</p>
                <p className="text-[12px] text-gray-300">Del producto si es posible.</p>
            </div>
            <div className="text-center p-3 border-y md:border-y-0 md:border-x border-gray-600">
                <div className="text-2xl mb-1">🔁</div>
                <p className="text-xs font-bold uppercase mb-1">Reemplazo</p>
                <p className="text-[12px] text-gray-300">Por uno nuevo (7-14 días hábiles).</p>
            </div>
            <div className="text-center p-3">
                <div className="text-2xl mb-1">💰</div>
                <p className="text-xs font-bold uppercase mb-1">Reembolso</p>
                <p className="text-[12px] text-gray-300">Según política de fabricante.</p>
            </div>
            </div>
        </section>

        {/* No Aplica */}
        <section className="mb-6">
            <h2 className="text-lg font-bold flex items-center mb-3">Casos en los que la garantía NO aplica</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
            {[
                "Daños por golpes, quemaduras o sobrecargas.",
                "Sellos de seguridad rotos o alterados.",
                "Líquidos, polvo excesivo o químicos.",
                "Modificaciones o reparaciones por terceros.",
                "Software o sistema operativo."
            ].map((item, index) => (
                <div key={index} className="flex items-center bg-[#333] p-2 rounded border border-red-900/30">
                <span className="mr-2">❌</span> {item}
                </div>
            ))}
            </div>
        </section>

        {/* Envíos */}
        <section className="mt-8 p-5 bg-gradient-to-br from-[#FF6800] to-[#CC3600] border border-white/20 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold flex items-center mb-2 text-white">
            <span className="mr-2">📦</span> Envíos para garantía
        </h2>
        <p className="text-sm leading-relaxed mb-3 text-white font-medium">
            Si envías el producto desde fuera de Medellín, debe estar bien empacado para evitar daños en el transporte. Los costos de envío corren por cuenta del cliente.
        </p>
        <div className="text-[12px] italic text-white/90 border-t border-white/20 pt-2">
            <p>
            * Si después de la revisión se determina que el producto no tiene fallas, se devolverá al cliente sin costo adicional por la revisión.
            </p>
        </div>
        </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicies;