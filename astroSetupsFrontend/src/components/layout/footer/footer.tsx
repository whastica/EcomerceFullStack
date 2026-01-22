import FooterBrand from './FooterBrand';
import QuickLinks from './QuickLinks';
import PackageTracking from './PackageTracking';

export default function Footer() {
  return (
    <footer className="bg-dark-card text-dark-text text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <FooterBrand />
        <QuickLinks />
        <PackageTracking />
      </div>

      <div className="border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-dark-muted text-center md:text-left">
            © {new Date().getFullYear()}  Todos los derechos reservados.
          </span>
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            <a href="/privacy" className="text-dark-muted hover:text-purple-500 transition-colors">Política de Privacidad</a>
            <a href="/terms" className="text-dark-muted hover:text-purple-500 transition-colors">Términos y Condiciones</a>
            <a href="/shipping" className="text-dark-muted hover:text-purple-500 transition-colors">Política de Envíos</a>
            <a href="/warranty" className="text-dark-muted hover:text-purple-500 transition-colors">Garantías</a>
          </div>
        </div>
      </div>
    </footer>
  );
}