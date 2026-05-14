const PrivacyPolicies = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-grow flex flex-col items-center py-10">
        <div className="bg-[#4D4D4D] text-white w-full max-w-4xl p-6 rounded-md text-center">
          <h1 className="text-[46px] font-bold font-montserrat">Políticas de Privacidad</h1>
        </div>
        <a href="/" className="text-white underline text-center block mt-6">Volver al inicio</a>
        <div className="text-white max-w-4xl px-6 mt-6">
          <p className="text-base font-montserrat leading-relaxed">
            En cumplimiento de la Ley Estatutaria 1581 de 2012 de Protección de Datos Personales (LEPD) y sus normas concordantes, ASTROSETUPS SOLUTIONS informa a los Titulares sobre el tratamiento que recibirán sus datos personales, así como su posible transmisión y/o transferencia a terceros.
          </p>
          <h2 className="text-lg font-bold mt-4">1. Responsable del Tratamiento</h2>
          <p className="text-base font-montserrat leading-relaxed">
            ASTROSETUPS SOLUTIONS, con correo electrónico astrosetupssolutionsco@gmail.com, será el responsable del tratamiento de los datos personales.
          </p>
          <h2 className="text-lg font-bold mt-4">2. Datos recopilados</h2>
          <p className="text-base font-montserrat leading-relaxed">
            Podemos recopilar datos como:
          </p>
          <ul className="list-disc list-inside">
            <li>Información de contacto (nombre, correo electrónico, teléfono).</li>
            <li>Datos de facturación (cuando aplique).</li>
            <li>Información de preferencias de compra y navegación en nuestra página.</li>
          </ul>
          <h2 className="text-lg font-bold mt-4">3. Finalidad del Tratamiento</h2>
          <p className="text-base font-montserrat leading-relaxed">
            Los datos personales serán utilizados para:
          </p>
          <ul className="list-disc list-inside">
            <li>Gestión de clientes y atención al cliente.</li>
            <li>Fidelización de clientes.</li>
            <li>Marketing, publicidad y prospección comercial.</li>
            <li>Segmentación de mercado y personalización de ofertas.</li>
            <li>Cumplimiento de obligaciones legales.</li>
          </ul>
          <h2 className="text-lg font-bold mt-4">4. Derechos del Titular</h2>
          <p className="text-base font-montserrat leading-relaxed">
            Los Titulares pueden ejercer los derechos de acceso, corrección, supresión, revocación y reclamo enviando un correo a astrosetupssolutionsco@gmail.com con el asunto “Ejercicio de derechos” indicando el derecho que desean ejercer.
          </p>
          <h2 className="text-lg font-bold mt-4">5. Seguridad y Confidencialidad</h2>
          <p className="text-base font-montserrat leading-relaxed">
            Implementamos medidas de seguridad adecuadas para proteger la información contra acceso no autorizado, pérdida o alteración.
          </p>
          <h2 className="text-lg font-bold mt-4">6. Conservación de los Datos</h2>
          <p className="text-base font-montserrat leading-relaxed">
            Los datos personales serán conservados mientras sean necesarios para las finalidades mencionadas o conforme a obligaciones legales.
          </p>
          <h2 className="text-lg font-bold mt-4">7. Transferencias y Uso de Terceros</h2>
          <p className="text-base font-montserrat leading-relaxed">
            Los datos podrán ser compartidos con terceros aliados comerciales o proveedores de servicios bajo estrictas condiciones de confidencialidad y solo para los fines establecidos en esta política.
          </p>
          <h2 className="text-lg font-bold mt-4">8. Cambios en la Política de Privacidad</h2>
          <p className="text-base font-montserrat leading-relaxed">
            ASTROSETUPS SOLUTIONS se reserva el derecho de modificar esta Política de Privacidad en cualquier momento. Los cambios serán notificados a través de nuestra página web o por correo si se encuentran registrados.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicies;