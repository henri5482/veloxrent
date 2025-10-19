import carrosData from '@/app/data/cars.json';
import { notFound } from 'next/navigation';
import ClientVehicleDetails from './ClientVehicleDetails';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function VehiculoDetalle({ params }: PageProps) {
  // ✅ AGREGAR AWAIT AQUÍ - Esta es la solución
  const { slug } = await params;
  const vehiculo = carrosData.find(v => v.slug === slug);

  if (!vehiculo) {
    notFound();
  }

  return (
    <div className="py-40">
      <ClientVehicleDetails />
    </div>
  );
}

// Generación de rutas estáticas
export async function generateStaticParams() {
  return carrosData.map((vehiculo) => ({
    slug: vehiculo.slug,
  }));
}