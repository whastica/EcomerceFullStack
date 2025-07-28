import Container from '../../components/layout/container/Container';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const socialLinks = [
    { icon: <FaFacebookF />, label: 'Facebook', href: '#' },
    { icon: <FaInstagram />, label: 'Instagram', href: '#' },
    { icon: <FaTwitter />, label: 'Twitter', href: '#' },
    { icon: <FaYoutube />, label: 'YouTube', href: '#' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos del contacto:', formData);
    // Aquí iría la lógica para enviar el formulario
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '573237221518'; // Número sin espacios ni caracteres especiales
    const message = 'Hola, me gustaría recibir información sobre sus productos y servicios.';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-dark-tech-pattern text-dark-text flex flex-col relative">
      {/* Fondo decorativo animado */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Capas base */}
        <div className="absolute inset-0 bg-dark-gradient"></div>
        <div className="absolute inset-0 bg-geometric-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
        {/* Degradado gris claro en diagonal hacia la parte superior derecha */}
        <div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 0%, #f3f4f6 200%)`,
          }}
        />
      </div>

      <main className="flex-grow flex items-center justify-center z-10 relative py-16">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl bg-transparent p-4 md:p-10 rounded-lg">
          {/* Lado izquierdo: Información y Formulario */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Requieres una cotización mucho más grande?
              </h2>
              <h5 className="text-lg text-gray-300 leading-relaxed">
                Si estás interesado/a en recibir un asesoramiento específico para tu
                requerimiento de mayor cantidad o preguntar por un producto que no está disponible...
              </h5>
            </div>

            {/* Formulario de Contacto */}
            <div
              className="rounded-xl shadow-lg p-8 w-full"
              style={{ backgroundColor: '#4D4D4D' }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2 text-center">
                  Por favor completa el formulario a continuación y nos contactaremos
                </h3>
                <h3 className="text-xl font-bold text-white text-center">
                  contigo!
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nombre */}
                <div>
                  <label className="block text-gray-300 mb-1" htmlFor="name">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-300 mb-1" htmlFor="email">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ejemplo@email.com"
                    required
                  />
                </div>

                {/* Celular */}
                <div>
                  <label className="block text-gray-300 mb-1" htmlFor="phone">
                    Celular
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+57 300 123 4567"
                    required
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-gray-300 mb-1" htmlFor="message">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                    placeholder="Describe tu requerimiento o consulta..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-md bg-[#FB5607] hover:bg-[#e44e06] text-white font-semibold transition duration-300"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>

          {/* Lado derecho: Información de contacto */}
          <div className="flex flex-col justify-center">
            <div
              className="rounded-xl shadow-lg p-8 w-full"
              style={{ backgroundColor: '#4D4D4D' }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Algunas formas de conectarse con nosotros
              </h3>

              <div className="space-y-6">
                {/* Soporte y ventas */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Soporte y ventas:
                  </h4>
                  
                  {/* Botón de WhatsApp */}
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                    style={{
                      backgroundColor: '#D6FF3C',
                      color: '#000',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                      boxShadow:
                        '0 4px 15px rgba(214, 255, 60, 0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(to right, #f97316, #ea580c)';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#D6FF3C';
                      e.currentTarget.style.color = '#000';
                    }}
                    >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      className="flex-shrink-0"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.086"/>
                    </svg>
                    <span>Escríbenos por WhatsApp</span>
                  </button>
                </div>

                {/* Información de contacto */}
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-center space-x-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <div>
                      <p className="font-medium text-white">Teléfono:</p>
                      <p>+57 323 722 1518</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <div>
                      <p className="font-medium text-white">Dirección:</p>
                      <p>Medellín - Colombia</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mt-1">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                    <div>
                      <p className="font-medium text-white">Horario de atención:</p>
                      <p>Lunes a sábado: 9 a.m. - 8 p.m.</p>
                      <p>Domingo y festivos: No prestamos servicios de soporte.</p>
                    </div>
                  </div>
                </div>

                {/* Redes sociales */}
                <div className="pt-6 border-t border-gray-600">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Síguenos en nuestras redes:
                  </h4>
                  <div className="flex space-x-4">
                    {socialLinks.map(({ icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg text-white text-lg shadow-md transition-transform duration-200 hover:scale-105 active:scale-95"
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}