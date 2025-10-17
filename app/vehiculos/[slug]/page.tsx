// app/vehiculos/[slug]/page.tsx
import carrosData from '@/app/data/cars.json';
import Footer from '@/app/footer';
import Navbar from '@/app/navbar';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function VehiculoDetalle({ params }: PageProps) {
  // AWAIT los params antes de usarlos
  const { slug } = await params;
  const vehiculo = carrosData.find(v => v.slug === slug);

  if (!vehiculo) {
    notFound();
  }

  return (
    <>
   <Navbar/> 
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            href="/vehiculos"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            ← Volver a vehículos
          </Link>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Imagen */}
            <div className="p-6">
              <div className="h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                <img 
                  src={vehiculo.imagen} 
                  alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Información */}
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {vehiculo.marca} {vehiculo.modelo}
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <span>{vehiculo.tipo}</span>
                  <span>•</span>
                  <span>{vehiculo.año}</span>
                </div>
              </div>

              {/* Precio */}
              <div className="mb-6">
                <div className="text-4xl font-bold text-green-600">
                  s/{vehiculo.precio.toFixed(2)}
                </div>
                <div className="text-gray-500">por día</div>
              </div>

              {/* Descripción */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Descripción</h2>
                <p className="text-gray-700 leading-relaxed">
                  {vehiculo.descripcion}
                </p>
              </div>

              {/* Características */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Características</h2>
                <div className="grid grid-cols-2 gap-2">
                  {vehiculo.caracteristicas.map((caracteristica, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{caracteristica}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Especificaciones */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Especificaciones</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Combustible:</span> {vehiculo.especificaciones.combustible}
                  </div>
                  <div>
                    <span className="font-medium">Transmisión:</span> {vehiculo.especificaciones.transmision}
                  </div>
                  <div>
                    <span className="font-medium">Puertas:</span> {vehiculo.especificaciones.puertas}
                  </div>
                  <div>
                    <span className="font-medium">Pasajeros:</span> {vehiculo.especificaciones.pasajeros}
                  </div>
                </div>
              </div>

              {/* Botón Alquilar */}
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-colors duration-200">
                Alquilar ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

// Generar los slugs estáticos
export async function generateStaticParams() {
  return carrosData.map((vehiculo) => ({
    slug: vehiculo.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  // AWAIT los params aquí también
  const { slug } = await params;
  const vehiculo = carrosData.find(v => v.slug === slug);
  
  if (!vehiculo) {
    return {
      title: 'Vehículo No Encontrado'
    };
  }

  return {
    title: `${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.año} - Alquiler`,
    description: vehiculo.descripcion
  };
}