/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import carrosData from "@/app/data/cars.json";
import Footer from "@/app/footer";
import Navbar from "@/app/navbar";
import {
  getPrecioYBeneficios,
  normalizePlan,
  PLANES_DEFAULT,
  PlanKey,
} from "@/app/utils/planes";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCar,
  FaCogs,
  FaGasPump,
  FaIdCard,
  FaPeopleArrows,
  FaShieldAlt,
} from "react-icons/fa";
import { TbArmchair } from "react-icons/tb";
import AlquilerModal from "../AlquilarModal";

type Vehiculo = (typeof carrosData)[number];

type Props = Readonly<{
  slug: string;
  initialPlan?: string | null;
}>;

/** Convierte un watch URL de YouTube a formato embed (por si en el JSON ponen watch?v=...) */
function toEmbed(url: string) {
  try {
    // ya viene embed
    if (url.includes("/embed/")) return url;

    // watch?v=ID
    const u = new URL(url);
    if (
      (u.hostname === "www.youtube.com" || u.hostname === "youtube.com") &&
      u.pathname === "/watch" &&
      u.searchParams.get("v")
    ) {
      const v = u.searchParams.get("v");
      return `https://www.youtube.com/embed/${v}`;
    }

    // youtu.be/ID
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }

    // fallback: devolver tal cual
    return url;
  } catch {
    return url;
  }
}

export default function ClientVehicleDetails({ slug, initialPlan }: Props) {
  const plan = (normalizePlan(initialPlan ?? undefined) ?? "basico") as PlanKey;

  const vehiculoData: Vehiculo | undefined = (carrosData as Vehiculo[]).find(
    (v) => v.slug === slug
  );
  if (!vehiculoData) return null; // evitar notFound() en cliente

  const [mainImage, setMainImage] = useState(vehiculoData.imagenes?.[0] ?? "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { precio, beneficios, label } = useMemo(
    () => getPrecioYBeneficios(vehiculoData, plan),
    [vehiculoData, plan]
  );

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

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Galería */}
            <div className="lg:col-span-3 space-y-4">
              <div className="aspect-[20/14] bg-gray-200 rounded-xl overflow-hidden shadow-lg">
                {mainImage ? (
                  <Image
                    src={mainImage.startsWith("/") ? mainImage : `/${mainImage}`}
                    alt={`${vehiculoData.marca} ${vehiculoData.modelo}`}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
              <div className="flex gap-3 justify-center">
                {vehiculoData.imagenes.slice(0, 4).map((img) => (
                  <button
                    key={img}
                    onClick={() => setMainImage(img.startsWith("/") ? img : `/${img}`)}
                    className={`w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      (img.startsWith("/") ? img : `/${img}`) === mainImage
                        ? "border-blue-500 ring-2 ring-blue-500/30 shadow-md"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={img.startsWith("/") ? img : `/${img}`}
                      alt="miniatura"
                      width={96}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-600">
                {vehiculoData.tipo}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
                {vehiculoData.marca} {vehiculoData.modelo}
              </h1>
              <div className="text-lg font-medium text-gray-500 mb-4">
                {vehiculoData.año}
              </div>

              {/* Chips de plan */}
              <div className="flex gap-2 flex-wrap">
                {(["basico", "plus", "libre"] as PlanKey[]).map((p) => (
                  <Link
                    key={p}
                    href={`/vehiculos/${vehiculoData.slug}?plan=${p}`}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      plan === p
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-200"
                    }`}
                  >
                    {PLANES_DEFAULT[p].label}
                  </Link>
                ))}
              </div>

              {/* Precio y beneficios del plan elegido */}
              <div className="mb-2 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="text-sm text-blue-700 font-semibold">{label}</div>
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-1">
                  S/{precio.toFixed(2)}
                </div>
                <div className="text-blue-500 text-base font-medium">
                  Precio por día
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Beneficios incluidos
                </h3>
                <ul className="list-disc ml-5 text-gray-700 space-y-1">
                  {beneficios.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-blue-600 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors shadow-lg flex items-center justify-center gap-3"
              >
                <FaCar className="text-xl" />
                Reservar ahora
              </button>
            </div>
          </div>

          {/* Descripción + Video */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Descripción General
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {vehiculoData.descripcion}
              </p>

              {/* 🎥 Video 16:9 SOLO YouTube */}
              {vehiculoData.video && (
                <div className="mt-6 aspect-video rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src={toEmbed(vehiculoData.video)}
                    title={`Video ${vehiculoData.marca} ${vehiculoData.modelo}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>

            {/* Especificaciones */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Características
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Spec
                  icon={FaCar}
                  title="Tipo de vehículo"
                  value={vehiculoData.especificaciones.tipoVehiculo}
                />
                <Spec
                  icon={FaGasPump}
                  title="Combustible"
                  value={vehiculoData.especificaciones.tipoCombustible}
                />
                <Spec icon={FaCalendarAlt} title="Año" value={vehiculoData.año} />
                <Spec
                  icon={FaCogs}
                  title="Transmisión"
                  value={vehiculoData.especificaciones.transmision}
                />
                <Spec
                  icon={TbArmchair}
                  title="Asientos"
                  value={vehiculoData.especificaciones.asientos}
                />
                <Spec
                  icon={FaPeopleArrows}
                  title="Filas"
                  value={vehiculoData.especificaciones.filas}
                />
                <Spec
                  icon={FaIdCard}
                  title="Licencia"
                  value={vehiculoData.especificaciones.licencia}
                />
                <Spec
                  icon={FaShieldAlt}
                  title="Garantía"
                  value={vehiculoData.especificaciones.garantia}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <AlquilerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vehiculo={vehiculoData}
      />
    </>
  );
}

function Spec({
  icon: Icon,
  title,
  value,
}: Readonly<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string | number;
}>) {
  return (
    <div className="flex items-start space-x-3 p-4 bg-white/80 rounded-xl shadow-sm border border-gray-100">
      <Icon className="text-xl text-blue-500 mt-1" />
      <div>
        <p className="text-xs font-medium uppercase text-gray-500">{title}</p>
        <p className="text-base font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
