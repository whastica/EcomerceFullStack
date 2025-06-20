import './styles/global.css';
import './App.css';
import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/footer';
import Container from './components/layout/Container';

interface FilterState {
  priceRange: [number, number];
  brands: string[];
  availability: 'all' | 'inStock' | 'outOfStock';
}

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarType, setSidebarType] = useState<'catalog' | 'admin'>('catalog');

  // Datos de ejemplo para el sidebar
  const exampleCategories = [
    { id: 1, name: 'Memorias RAM', slug: 'memorias-ram', productCount: 25 },
    { id: 2, name: 'Tarjetas Gráficas', slug: 'tarjetas-graficas', productCount: 18 },
    { id: 3, name: 'Procesadores', slug: 'procesadores', productCount: 15 },
    { id: 4, name: 'Tarjetas Madre', slug: 'tarjetas-madre', productCount: 12 },
    { id: 5, name: 'Refrigeración', slug: 'refrigeracion', productCount: 8 },
    { id: 6, name: 'Almacenamiento SSD', slug: 'almacenamiento-ssd', productCount: 20 },
    { id: 7, name: 'Monitores', slug: 'monitores', productCount: 14 },
    { id: 8, name: 'Fuentes de Poder', slug: 'fuentes-de-poder', productCount: 10 },
    { id: 9, name: 'Chasis - Torres', slug: 'chasis-torres', productCount: 6 },
    { id: 10, name: 'Periféricos', slug: 'perifericos', productCount: 30 },
    { id: 11, name: 'Promociones', slug: 'promociones', productCount: 5 },
  ];

  const handleFilterChange = (filters: FilterState) => {
    console.log('Filtros aplicados:', filters);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        cartItemCount={3}
        isAuthenticated={true}
        userRole="CLIENT"
        userName="Juan Pérez"
      />
      
      {/* Controles de prueba */}
      <Container padding="small">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Controles de Prueba - Sidebar</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              {isSidebarOpen ? 'Cerrar' : 'Abrir'} Sidebar
            </button>
            
            <select
              value={sidebarType}
              onChange={(e) => setSidebarType(e.target.value as 'catalog' | 'admin')}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="catalog">Catálogo</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </Container>

      {/* Layout principal con sidebar */}
      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          type={sidebarType}
          categories={exampleCategories}
          onFilterChange={handleFilterChange}
        />
        
        {/* Contenido principal */}
        <div className="flex-1">
          <Container>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                ¡Bienvenido a Astro Setups!
              </h1>
              <p className="text-gray-600 mb-4">
                Tu tienda de confianza para productos de hardware gaming y tecnología.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800">Monitores Gaming</h3>
                  <p className="text-sm text-purple-600">Alta resolución y baja latencia</p>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-teal-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800">Tarjetas Gráficas</h3>
                  <p className="text-sm text-green-600">Rendimiento excepcional</p>
                </div>
                <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800">Periféricos</h3>
                  <p className="text-sm text-orange-600">Teclados, mouse y más</p>
                </div>
              </div>

              {/* Información sobre el sidebar */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Estado del Sidebar:</h3>
                <p className="text-sm text-gray-600">
                  Tipo: <span className="font-medium">{sidebarType}</span> | 
                  Estado: <span className="font-medium">{isSidebarOpen ? 'Abierto' : 'Cerrado'}</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  💡 El Sidebar ahora se enfoca solo en filtros (catálogo) y navegación administrativa. 
                  La navegación móvil se maneja desde el Navbar.
                </p>
              </div>
            </div>
          </Container>

          {/* Ejemplos de diferentes variantes del Container */}
          <Container variant="narrow" padding="large" className="mt-8">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Container Narrow</h2>
              <p className="text-purple-100">
                Este es un ejemplo del Container con variante "narrow" y padding "large".
                Perfecto para contenido centrado y enfocado.
              </p>
            </div>
          </Container>

          <Container variant="wide" padding="small" className="mt-8">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Container Wide</h2>
              <p className="text-green-100">
                Este es un ejemplo del Container con variante "wide" y padding "small".
                Ideal para contenido que necesita más espacio horizontal.
              </p>
            </div>
          </Container>
        </div>
      </div>

      <Footer />
    </div>
  );
}


