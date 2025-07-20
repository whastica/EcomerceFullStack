import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function SocialIcons() {
  const socialLinks = [
    { icon: <FaFacebookF />, label: 'Facebook', href: '#' },
    { icon: <FaInstagram />, label: 'Instagram', href: '#' },
    { icon: <FaTwitter />, label: 'Twitter', href: '#' },
    { icon: <FaYoutube />, label: 'YouTube', href: '#' },
  ];

  return (
    <div className="flex space-x-3">
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
  );
}