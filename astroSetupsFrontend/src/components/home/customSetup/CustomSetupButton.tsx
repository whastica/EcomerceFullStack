import { Link } from 'react-router-dom';

export default function CustomSetupButton() {
  return (
    <div className="mt-12 flex justify-center w-full">
      <Link
        to="/customPc"
        className="inline-block px-6 py-3 font-semibold rounded-lg border-2 border-green-300 text-black bg-lime-200 shadow-custom transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-600 hover:text-white hover:shadow-lg active:scale-95 active:shadow-md"
      >
        🛠️ Personaliza tu PC
      </Link>
    </div>
  );
}