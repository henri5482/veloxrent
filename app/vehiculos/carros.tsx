"use client";
import { Bebas_Neue } from "next/font/google";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaCar,
  FaCogs,
  FaGasPump,
} from "react-icons/fa";
import carrosData from "../data/cars.json";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});
const Carros = () => {
  const getBrandColor = (marca: string) => {
    const colors: { [key: string]: string } = {
      Toyota: "text-red-600",
      Nissan: "text-slate-600",
      Hyundai: "text-blue-600",
      Kia: "text-green-600",
      Honda: "text-slate-700",
      Mazda: "text-red-500",
      default: "text-slate-600",
    };
    return colors[marca] || colors.default;
  };

  const getBrandGradient = (marca: string) => {
    const gradients: { [key: string]: string } = {
      Toyota: "from-red-50 to-red-100",
      Nissan: "from-slate-50 to-slate-100",
      Hyundai: "from-blue-50 to-blue-100",
      Kia: "from-green-50 to-green-100",
      Honda: "from-slate-50 to-slate-100",
      Mazda: "from-red-50 to-red-100",
      default: "from-slate-50 to-slate-100",
    };
    return gradients[marca] || gradients.default;
  };

  // Función para renderizar solo 4 especificaciones importantes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderSpecs = (vehiculo: any) => {
    const { especificaciones, año } = vehiculo;
    return (
      <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
        {/* Tipo de vehículo */}
        <div className="flex items-center gap-2">
          <FaCar className={`${getBrandColor(vehiculo.marca)} text-sm`} />
          <span>{especificaciones.tipoVehiculo}</span>
        </div>

        {/* Tipo de combustible */}
        <div className="flex items-center gap-2">
          <FaGasPump className={`${getBrandColor(vehiculo.marca)} text-sm`} />
          <span>{especificaciones.tipoCombustible}</span>
        </div>

        {/* Año */}
        <div className="flex items-center gap-2">
          <FaCogs className={`${getBrandColor(vehiculo.marca)} text-sm`} />
          <span>{año}</span>
        </div>

        {/* Transmisión */}
        <div className="flex items-center gap-2">
          <FaCogs className={`${getBrandColor(vehiculo.marca)} text-sm`} />
          <span>{especificaciones.transmision}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 py-16 md:pt-56">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-0.5 bg-blue-400 rounded-full"></div>
            <span className="text-blue-600 font-semibold tracking-widest text-sm uppercase">
              Flota Premium
            </span>
            <div className="w-12 h-0.5 bg-blue-400 rounded-full"></div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${bebas.className} text-4xl md:text-7xl font-bold text-slate-800 mb-6`}
          >
            Nuestra Flota de Vehículos
          </motion.h1>


          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Descubre nuestra selección de vehículos premium para cada ocasión
          </motion.p>
        </div>

        {/* Grid de vehículos */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {carrosData.map((vehiculo, index) => (
            <motion.div
              key={vehiculo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -8, transition: { duration: 0.15 } }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200"
            >
              {/* Header */}
              <div
                className={`relative h-12 bg-gradient-to-r ${getBrandGradient(
                  vehiculo.marca
                )} flex items-center justify-between px-6`}
              >
                <span
                  className={`font-bold text-sm tracking-wider ${getBrandColor(
                    vehiculo.marca
                  )}`}
                >
                  {vehiculo.marca.toUpperCase()}
                </span>
                <span className="text-slate-600 text-sm font-semibold bg-white/80 px-2 py-1 rounded-full">
                  {vehiculo.año}
                </span>
              </div>

              {/* Imagen */}
              <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                <Image
                  src={vehiculo.imagenes[0]}
                  alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full text-xs font-semibold border border-slate-200 shadow-sm">
                    {vehiculo.tipo}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-baseline gap-1 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
                    <span className="text-2xl font-bold text-green-600">
                      s/{vehiculo.precio.toFixed(2)}
                    </span>
                    <span className="text-slate-500 text-sm ml-1">/día</span>
                  </div>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {vehiculo.modelo}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-1">
                  {vehiculo.descripcion}
                </p>

                {/* Especificaciones */}
                {renderSpecs(vehiculo)}

                {/* Botón */}
                <Link
                  href={`/vehiculos/${vehiculo.slug}`}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl text-center flex items-center justify-center gap-2 shadow"
                >
                  Reservar
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carros;
