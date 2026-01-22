import SocialIcons from './SocialIcons';

export default function FooterBrand() {
  return (
    <div>
      {/*<img
        src="/assets/icono/logo.png"
        alt="Astro Setups Logo"
        className="h-10 mb-4"
      />*/}
      <p className="text-dark-muted mb-4">
        Tu lugar indispensable de tecnología. Encuentra las mejores piezas y componentes para tu computadora gamer o profesional.
      </p>
      <SocialIcons />
    </div>
  );
}