import Container from '../../components/layout/container/Container';
import ProductGrid from '../../components/products/ProductGrid';
import { Product } from '../../components/products/ProductCard';
import { useState } from 'react';

export interface ProductDetail extends Product {
  description: string;
  specifications: { [key: string]: string };
  images: string[];
  category: string;
  stock: number;
  rating?: number;
  reviewCount?: number;
  features?: string[];
}

export default function RegisterPage() {
  const [isRobotVerified, setIsRobotVerified] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const relatedProducts: Product[] = [
    {
      id: 2,
      name: 'NVIDIA RTX 4060 Ti',
      price: 2100000,
      imageUrl: '/assets/relacionados/rtx-4060-ti.webp',
      isAvailable: true,
      brand: 'NVIDIA',
    },
    {
      id: 3,
      name: 'AMD Radeon RX 7800 XT',
      price: 2800000,
      imageUrl: '/assets/relacionados/RX-7800XT.webp',
      isAvailable: true,
      brand: 'AMD',
    },
    {
      id: 4,
      name: 'NVIDIA RTX 4080 Super',
      price: 4200000,
      imageUrl: '/assets/relacionados/x1-925-600x600.webp',
      isAvailable: false,
      brand: 'NVIDIA',
    },
    {
      id: 5,
      name: 'AMD Radeon RX 7900 XTX',
      price: 3800000,
      imageUrl: '/assets/relacionados/amd7900.webp',
      isAvailable: true,
      brand: 'AMD',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    if (!isRobotVerified) {
      alert('Por favor verifica que no eres un robot');
      return;
    }
    
    // Aquí iría la lógica de registro
    console.log('Datos del registro:', formData);
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
          {/* Lado izquierdo: Beneficios */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Únete a nuestra comunidad:
            </h2>
            <ul className="space-y-3 text-lg text-gray-300 list-disc list-inside">
              <li>Agilizar el proceso de compra</li>
              <li>Guardar direcciones de envío</li>
              <li>Seguimiento de tus compras</li>
              <li>Seguimiento de tus envíos</li>
              <li>Acceder a descuentos y promociones exclusivas</li>
              <li>Historial completo de compras</li>
            </ul>
          </div>

          {/* Lado derecho: Formulario de Registro */}
          <div
            className="rounded-xl shadow-lg p-8 w-full max-w-md mx-auto"
            style={{ backgroundColor: '#4D4D4D' }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Crear cuenta
            </h3>
            
            {/* Login */}
            <p className="text-sm text-center text-gray-300 mb-6">
              ¿Ya tienes una cuenta?{' '}
              <a
                href="/login"
                className="text-[#FB5607] hover:underline font-medium"
              >
                Inicia sesión aquí
              </a>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombre y Apellidos */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1" htmlFor="firstName">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1" htmlFor="lastName">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tus apellidos"
                    required
                  />
                </div>
              </div>

              {/* Nombre de usuario */}
              <div>
                <label className="block text-gray-300 mb-1" htmlFor="username">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Usuario único"
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

              {/* Teléfono */}
              <div>
                <label className="block text-gray-300 mb-1" htmlFor="phone">
                  Teléfono
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

              {/* Contraseña */}
              <div>
                <label className="block text-gray-300 mb-1" htmlFor="password">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                  required
                />
              </div>

              {/* Confirmar contraseña */}
              <div>
                <label className="block text-gray-300 mb-1" htmlFor="confirmPassword">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                  required
                />
              </div>

              {/* Verificación de robot */}
              <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-md">
                <input
                  type="checkbox"
                  id="robotCheck"
                  checked={isRobotVerified}
                  onChange={(e) => setIsRobotVerified(e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="robotCheck" className="text-gray-700 text-sm">
                  No soy un robot
                </label>
                <div className="ml-auto">
                  <div className="text-xs text-gray-500 border border-gray-300 px-2 py-1 rounded">
                    reCAPTCHA
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md bg-[#FB5607] hover:bg-[#e44e06] text-white font-semibold transition duration-300"
              >
                Crear cuenta
              </button>

              {/* Términos y condiciones */}
              <p className="text-xs text-center text-gray-400">
                Al registrarte, aceptas nuestros{' '}
                <a href="/terms" className="text-[#c5ec29] hover:underline">
                  Términos y Condiciones
                </a>{' '}
                y{' '}
                <a href="/privacy" className="text-[#c5ec29] hover:underline">
                  Política de Privacidad
                </a>
              </p>
            </form>
          </div>
        </Container>
      </main>

      <Container padding="large" className="pt-0">
        <div className="glass-effect rounded-lg p-6 border-dark-border">
          <h2 className="text-6xl sm:text-4xl font-bold mb-6 text-dark-text text-shadow-dark">
            Explora Nuestros Productos
          </h2>
          <ProductGrid products={relatedProducts} productsPerPage={4} />
        </div>
      </Container>
    </div>
  );
}