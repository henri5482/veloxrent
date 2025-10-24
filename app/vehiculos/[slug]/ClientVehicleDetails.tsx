"use client";

import carrosData from '@/app/data/cars.json';
import Footer from '@/app/footer';
import Navbar from '@/app/navbar';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useState } from 'react';
import {
  FaArrowLeft,
  FaCar,
  FaCogs,
  FaGasPump,
  FaIdCard,
  FaShieldAlt
} from 'react-icons/fa';
import { IoIosColorFilter } from 'react-icons/io';
import AlquilerModal from '../AlquilarModal';

// ✅ Interfaz alineada con tu JSON
interface Vehiculo {
  id: number;
  slug: string;
  marca: string;
  modelo: string;
  año: number;
  tipo: string;
  precio: number;
  imagen: string;
  imagenes: string[];
  descripcion: string;
  caracteristicas?: string[];
  especificaciones: {
    tipoVehiculo: string;
    tipoCombustible: string;
    transmision: string;
    recorrido: string;
    filas: number;
    licencia: string;
    garantia: string;
  };
}

// Componente auxiliar para mostrar especificaciones
const FeatureItem = ({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string | number;
}) => {
  return (
    <div className="flex items-start space-x-3 p-4 bg-white/80 rounded-xl shadow-sm border border-gray-100">
      <Icon className="text-xl text-blue-500 mt-1" />
      <div>
        <p className="text-xs font-medium uppercase text-gray-500">{title}</p>
        <p className="text-base font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default function ClientVehicleDetails() {
  const params = useParams();
  const slug = params.slug as string;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const vehiculoData = carrosData.find((v) => v.slug === slug);
  if (!vehiculoData) notFound();

  const vehiculo: Vehiculo = {
    ...vehiculoData,
    imagen: vehiculoData.imagenes[0],
  };

  const [mainImage, setMainImage] = useState(vehiculo.imagenes[0]);

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/vehiculos"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              Volver a la flota de vehículos
            </Link>
          </nav>

          {/* Galería e información principal */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Galería */}
            <div className="lg:col-span-3 space-y-4">
              <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={mainImage}
                  alt={`${vehiculo.marca} ${vehiculo.modelo} - Vista principal`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  width={800}
                  height={450}
                  priority
                />
              </div>

              {/* Miniaturas */}
              <div className="flex gap-3 justify-center">
                {vehiculo.imagenes.slice(0, 3).map((img: string, idx: number) => (
                  <button
                    key={`thumbnail-${img}`}
                    onClick={() => setMainImage(img)}
                    className={`w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      img === mainImage
                        ? "border-blue-500 ring-2 ring-blue-500/30 shadow-md"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Miniatura ${idx + 1}`}
                      className="w-full h-full object-cover"
                      width={96}
                      height={64}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Información del vehículo */}
            <div className="lg:col-span-2 space-y-6">
              <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-600">
                {vehiculo.tipo}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
                {vehiculo.marca} {vehiculo.modelo}
              </h1>
              <div className="text-lg font-medium text-gray-500 mb-4">
                {vehiculo.año}
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-1">
                  S/{vehiculo.precio.toFixed(2)}
                </div>
                <div className="text-blue-500 text-base font-medium">
                  Precio por día
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full cursor-pointer  bg-blue-600 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors duration-200 shadow-lg flex items-center justify-center gap-3"
              >
                <FaCar className="text-xl" />
                Reserva ahora
              </button>
            </div>
          </div>

          {/* Descripción y especificaciones */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {/* Descripción y extras */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Descripción General
                </h2>
                <p className="text-gray-700 leading-relaxed text-base">
                  {vehiculo.descripcion}
                </p>
              </div>

              {/* <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Comodidades y Extras
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(vehiculo.caracteristicas ?? []).slice(0, 3).map(
                    (car: string, idx: number) => (
                      <div
                        key={`feature-${car}-${idx}`}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <FaShieldAlt className="text-base text-blue-500" />
                        <span className="text-gray-700 text-sm font-medium">
                          {car}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div> */}
            </div>

            {/* Especificaciones clave */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Especificaciones Clave
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <FeatureItem
                  icon={FaCar}
                  title="Tipo de vehículo"
                  value={vehiculo.especificaciones.tipoVehiculo}
                />
                <FeatureItem
                  icon={FaGasPump}
                  title="Tipo de combustible"
                  value={vehiculo.especificaciones.tipoCombustible}
                />
                <FeatureItem
                  icon={FaCogs}
                  title="Año"
                  value={vehiculo.año}
                />
                <FeatureItem
                  icon={FaCogs}
                  title="Transmisión"
                  value={vehiculo.especificaciones.transmision}
                />
                <FeatureItem
                  icon={FaCogs}
                  title="Recorrido"
                  value={vehiculo.especificaciones.recorrido}
                />
                <FeatureItem
                  icon={IoIosColorFilter}
                  title="Filas"
                  value={vehiculo.especificaciones.filas}
                />
                <FeatureItem
                  icon={FaIdCard}
                  title="Licencia"
                  value={vehiculo.especificaciones.licencia}
                />
                <FeatureItem
                  icon={FaShieldAlt}
                  title="Garantía"
                  value={vehiculo.especificaciones.garantia}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Modal de alquiler */}
      <AlquilerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vehiculo={vehiculo}
      />
    </>
  );
}
