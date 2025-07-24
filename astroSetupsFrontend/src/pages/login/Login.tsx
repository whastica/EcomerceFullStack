import Container from '../../components/layout/container/Container';
import ProductGrid from '../../components/products/ProductGrid';
import { Product } from '../../components/products/ProductCard';

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
export default function LoginPage() {
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
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl bg-transparent p-4 md:p-10 rounded-lg">
          {/* Lado izquierdo: Beneficios */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Esto es todo lo que vas a poder hacer:
            </h2>
            <ul className="space-y-3 text-lg text-gray-300 list-disc list-inside">
              <li>Agilizar el proceso de compra</li>
              <li>Guardar direcciones de envío</li>
              <li>Seguimiento de tus compras</li>
              <li>Seguimiento de tus envíos</li>
              <li>Acceder a descuentos y promociones</li>
            </ul>
          </div>

          {/* Lado derecho: Formulario de Login */}
          <div
            className="rounded-xl shadow-lg p-8 w-full max-w-md mx-auto"
            style={{ backgroundColor: '#4D4D4D' }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Inicia sesión
            </h3>

            {/* Registro */}
            <p className="text-sm text-center text-gray-300 mb-6">
              ¿No tienes una cuenta?{' '}
              <a
                href="/register"
                className="text-[#FB5607] hover:underline font-medium"
              >
                Regístrate aquí
              </a>
            </p>

            <form className="space-y-5">
              <div>
                <label
                  className="block text-gray-300 mb-1"
                  htmlFor="email"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-md bg-white -background border border-dark-border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ejemplo@email.com"
                />
              </div>

              <div>
                <label
                  className="block text-gray-300 mb-1"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 rounded-md bg-white -background border border-dark-border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md bg-[#FB5607] hover:bg-[#e44e06] text-white font-semibold transition duration-300"
              >
                Iniciar sesión
              </button>

              {/* Olvidaste tu contraseña */}
              <p className="text-sm text-center">
                <a href="/forgot-password" className="text-[#c5ec29] hover:underline font-medium">
                  ¿Olvidaste tu contraseña?
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