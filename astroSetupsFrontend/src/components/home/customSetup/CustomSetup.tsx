import Container from '../../layout/container/Container';
import CustomSetupContent from './CustomSetupContent';
import CustomSetupImage from './CustomSetupImage';
import CustomSetupButton from './CustomSetupButton';
import CustomSetupFeatures from './CustomSetupFeatures';

export default function CustomSetup() {
  return (
    <section
      className="w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/assets/relacionados/custom.webp')` }}
    >
      <div className="w-full h-full bg-gradient-to-r from-black/80 to-black/40">
        <Container
          padding="large"
          maxWidth="7xl"
          center
          className="py-20 flex flex-col justify-between min-h-[600px] text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
            <CustomSetupContent />
            <CustomSetupImage />
          </div>

          <CustomSetupButton />
          <CustomSetupFeatures />
        </Container>
      </div>
    </section>
  );
}