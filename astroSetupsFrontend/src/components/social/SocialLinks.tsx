import type { IconType } from 'react-icons';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  TIKTOK_URL,
  WHATSAPP_URL,
} from '../../config/socialLinks';

interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

/** Redes oficiales — mismo orden y diseño en toda la app. */
const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Facebook', href: FACEBOOK_URL, icon: FaFacebookF },
  { label: 'Instagram', href: INSTAGRAM_URL, icon: FaInstagram },
  { label: 'TikTok', href: TIKTOK_URL, icon: FaTiktok },
  { label: 'WhatsApp', href: WHATSAPP_URL, icon: FaWhatsapp },
];

interface SocialLinksProps {
  className?: string;
}

/**
 * Bloque de iconos de redes sociales (diseño naranja de marca).
 * Se usa en el Footer y en la página de contacto.
 */
export default function SocialLinks({
  className = 'flex space-x-3',
}: SocialLinksProps) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-brand to-brand-hover hover:from-brand-hover hover:to-brand-dark rounded-lg text-white text-lg shadow-md transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
