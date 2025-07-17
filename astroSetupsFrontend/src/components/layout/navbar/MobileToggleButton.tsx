import { Menu, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

export function MobileToggleButton({ isOpen, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden text-white hover:text-[#D7FE3B] px-3 py-2 rounded-md"
    >
      {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  );
}
