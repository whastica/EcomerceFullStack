import { FaTruck, FaShieldAlt, FaMoneyBillWave } from 'react-icons/fa';
import Container from '../../components/layout/container/Container';

export default function TrustBanner() {
  return (
    <Container padding="large" backgroundColor="transparent" className="mt-3">
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-white rounded-lg py-3 px-4"
        style={{ backgroundColor: 'var(--color-dark-border)' }}
      >
        <div className="flex flex-col items-center gap-2">
          <FaTruck className="text-3xl text-lime" />
          <p className="font-semibold text-sm">Envíos a toda Colombia</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <FaShieldAlt className="text-3xl text-lime" />
          <p className="font-semibold text-sm">Compra 100% segura</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <FaMoneyBillWave className="text-3xl text-lime" />
          <p className="font-semibold text-sm">Pagos contra entrega</p>
        </div>
      </div>
    </Container>
  );
}