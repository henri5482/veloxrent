"use client";

import data from "@/app/data/cars.json";
import { normalizePlan } from "@/app/utils/planes";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Car = (typeof data)[number];

const images = [
  { id: 1, src: "/banner01.png", alt: "Vehículo 1", link: "/vehiculos" },
  { id: 2, src: "/banner02.png", alt: "Vehículo 2", link: "/nosotros" },
];

export default function HeroCarousel() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 🔹 SOLO 2 SELECTS: Vehículo y Plan
  const [vehiculoSlug, setVehiculoSlug] = useState("");
  const [plan, setPlan] = useState<"" | "basico" | "plus" | "normal" | "libre">("");

  // 8 autos
  const vehiculos = useMemo(
    () =>
      (data as Car[]).map((v) => ({
        value: v.slug,
        label: `${v.marca} ${v.modelo} / ${v.especificaciones.pasajeros} asientos`,
        id: v.id,
      })),
    []
  );

  // Carrusel
  const nextSlide = () => setCurrentIndex((i) => (i + 1) % images.length);
  const prevSlide = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  useEffect(() => {
    if (!isAutoPlaying) return;
    const it = setInterval(nextSlide, 5000);
    return () => clearInterval(it);
  }, [isAutoPlaying, currentIndex]);

  const handleImageClick = () => {
    const current = images[currentIndex];
    if (current.link) router.push(current.link);
  };

  // Submit con la lógica pedida
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // Solo vehículo → ver 3 planes del auto
    if (vehiculoSlug && !plan) {
      router.push(`/buscar?tipo=plan&vehiculo=${encodeURIComponent(vehiculoSlug)}`);
      return;
    }

    // Vehículo + Plan → ir directo al detalle del auto con su plan
    if (vehiculoSlug && plan) {
      const p = normalizePlan(plan) ?? "plus";
      router.push(`/vehiculos/${vehiculoSlug}?plan=${p}`);
      return;
    }

    // Solo Plan → listado por plan
    if (!vehiculoSlug && plan) {
      const p = normalizePlan(plan) ?? "plus";
      router.push(`/buscar?tipo=plan&plan=${p}`);
      return;
    }

    // Fallback
    router.push(`/buscar`);
  };

  return (
    <div
      className="relative w-full h-screen md:h-[90vh] 2xl:h-[90vh] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Imagen */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full cursor-pointer"
            onClick={handleImageClick}
          >
            <div className="w-full h-full flex items-start justify-start lg:items-center lg:justify-center">
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="w-full h-auto object-top lg:object-contain max-h-full pt-28"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Flechas */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-900 rounded-full w-10 h-10 lg:w-12 lg:h-12 shadow-lg grid place-items-center"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-900 rounded-full w-10 h-10 lg:w-12 lg:h-12 shadow-lg grid place-items-center"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>

      {/* 🔵 BUSCADOR (SOLO 2 SELECTS) */}
      <div className="absolute max-md:bottom-36 md:bottom-[-20px] left-1/2 -translate-x-1/2 z-20 w-full max-w-7xl px-4 pb-4 lg:pb-5">
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="bg-[#1100FF] shadow-2xl py-5 px-4 lg:px-6 rounded-xl w-full"
        >
          <div className="text-center text-white font-semibold text-base mb-3">
            Buscar por Vehículo y Plan
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            {/* Vehículo */}
            <div className="flex flex-col text-white text-sm">
              <label className="font-medium mb-1">Vehículo</label>
              <select
                value={vehiculoSlug}
                onChange={(e) => setVehiculoSlug(e.target.value)}
                className="p-2 lg:p-3 rounded-md border border-white/40 text-black bg-white"
              >
                <option value="">Seleccionar</option>
                {vehiculos.map((v) => (
                  <option key={v.id} value={v.value}>{v.label}</option>
                ))}
              </select>
            </div>

            {/* Plan */}
            <div className="flex flex-col text-white text-sm">
              <label className="font-medium mb-1">Plan</label>
              <select
                value={plan}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e) => setPlan(e.target.value as any)}
                className="p-2 lg:p-3 rounded-md border border-white/40 text-black bg-white"
              >
                <option value="">Seleccionar</option>
                <option value="basico">Básico</option>
                <option value="plus">Plus (Normal)</option>
                <option value="libre">Libre</option>
              </select>
            </div>

            {/* Botón */}
            <div className="flex">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-blue-900 hover:bg-red-600 text-white font-semibold rounded-md"
              >
                Buscar
              </button>
            </div>
          </div>
        </motion.form>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-28 lg:bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
