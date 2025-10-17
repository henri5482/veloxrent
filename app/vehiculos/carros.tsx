// app/carros/page.tsx
import Link from 'next/link';
import carrosData from '../data/cars.json';

const Carros = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Encuentra el vehículo que necesitas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra Automóviles, Minivanes, Vanes, Camionetas y Camionetas SUV
          </p>
        </div>

        {/* Grid de vehículos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carrosData.map((vehiculo) => (
            <div 
              key={vehiculo.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Imagen */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <img 
                  src={vehiculo.imagen} 
                  alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Contenido */}
              <div className="p-6">
                {/* Precio */}
                <div className="flex justify-between items-start mb-3">
                  <span className="text-2xl font-bold text-green-600">
                    s/{vehiculo.precio.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">por/día</span>
                </div>

                {/* Descripción */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {vehiculo.descripcion}
                </p>

                {/* Tipo y Año */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-800">
                    {vehiculo.tipo}
                  </span>
                  <span className="text-sm text-gray-500">
                    {vehiculo.año}
                  </span>
                </div>

                {/* Botón Alquilar */}
                <Link 
                  href={`/vehiculos/${vehiculo.slug}`}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg text-center block transition-colors duration-200"
                >
                  Alquila ahora
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carros;