import { Truck, Headset, Star } from 'lucide-react'; // Puedes reemplazarlos por otros íconos si deseas

export default function CustomSetupFeatures() {
  const features = [
    {
      icon: <Truck className="w-6 h-6 text-primary" />,
      title: 'Envíos a toda Colombia',
      description: 'Trabajamos con las mejores transportadoras del país.',
    },
    {
      icon: <Headset className="w-6 h-6 text-primary" />,
      title: 'Asesoría personalizada',
      description: 'Tenemos un equipo especializado para ayudarte.',
    },
    {
      icon: <Star className="w-6 h-6 text-primary" />,
      title: 'Los mejores productos',
      description: 'Ofrecemos las mejores marcas a nivel mundial.',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-white text-center">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center gap-4 px-4">
          <div className="bg-white/10 p-3 rounded-full">{feature.icon}</div>
          <h3 className="text-lg font-semibold">{feature.title}</h3>
          <p className="text-sm opacity-80">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}