import { FC } from 'react';
import { CustomSetupProps } from './CustomSetupTypes';

const CustomSetupImage: FC<CustomSetupProps> = ({
  imageSrc = '/assets/relacionados/Caasecustom.png',
  imageAlt = 'Setup personalizado',
}) => {
  return (
    <div className="hidden md:flex justify-center">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="rounded-lg shadow-lg w-full max-w-md"
        loading="lazy"
      />
    </div>
  );
};

export default CustomSetupImage;