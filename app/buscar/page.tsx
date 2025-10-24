"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FaCar } from "react-icons/fa";
import carrosData from "../data/cars.json";
import Footer from "../footer";
import Navbar from "../navbar";



function BuscarContent() {
  const params = useSearchParams();

  // Parámetros desde el formulario
  const precio = params.get("precio");
  const transmision = params.get("transmision")?.toLowerCase() || "";
  const ruta = params.get("ruta")?.toLowerCase() || "";
  const vehiculo = params.get("vehiculo")?.toLowerCase() || "";

  // Filtro principal con lógica real
  const resultados = carrosData.filter((carro) => {
    const coincidePrecio = precio ? carro.precio <= Number(precio) : true;

    const coincideTransmision = transmision
      ? carro.especificaciones.transmision.toLowerCase().includes(transmision)
      : true;

    // 🔧 Ruta (solo simularemos su lógica)
    // "Asfaltado" = vehículos con transmisión automática o SUV
    // "Agreste" = camionetas o transmisión manual
    const coincideRuta = ruta
      ? ruta === "asfaltado"
        ? carro.especificaciones.transmision.toLowerCase() === "automática" ||
          carro.tipo.toLowerCase().includes("suv")
        : carro.tipo.toLowerCase().includes("camioneta") ||
          carro.especificaciones.transmision.toLowerCase() === "manual"
      : true;

    // Vehículo (nombre)
    const coincideVehiculo = vehiculo
      ? carro.modelo.toLowerCase().includes(vehiculo) ||
        carro.marca.toLowerCase().includes(vehiculo)
      : true;

    return (
      coincidePrecio &&
      coincideTransmision &&
      coincideRuta &&
      coincideVehiculo
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 md:py-56">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-10 text-center">
          Resultados de búsqueda
        </h1>

        {resultados.length === 0 ? (
          <p className="text-center text-slate-600">
            No se encontraron vehículos con esos criterios.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {resultados.map((vehiculo, index) => (
              <motion.div
                key={vehiculo.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="h-56 relative">
                  <img
                    src={vehiculo.imagenes[0]}
                    alt={vehiculo.modelo}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 rounded-xl shadow-md">
                    <span className="text-green-600 font-bold text-lg">
                      S/{vehiculo.precio.toFixed(2)}
                    </span>
                    <span className="text-slate-500 text-sm ml-1">/día</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {vehiculo.modelo}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {vehiculo.descripcion}
                  </p>
                  <Link
                    href={`/vehiculos/${vehiculo.slug}`}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl text-center flex items-center justify-center gap-2 shadow"
                  >
                    <FaCar /> Reservar
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Buscar() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="text-center py-20">Cargando...</div>}>
        <BuscarContent />
      </Suspense>
      <Footer />
    </>
  );
}
