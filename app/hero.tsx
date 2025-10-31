"use client";

import data from "@/app/data/cars.json";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const images = [
  {
    id: 1,
    src: "/banner01.png",
    alt: "Vehículo 1",
    link: "/vehiculos",
  },
  {
    id: 2,
    src: "/banner02.png",
    alt: "Vehículo 2",
    link: "/nosotros",
  },
];

const HeroCarousel = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [form, setForm] = useState({
    precio: "",
    transmision: "",
    ruta: "",
    vehiculo: "",
  });

  const rutasUnicas = Array.from(
    new Set(data.map((carro) => carro.especificaciones.terreno))
  );

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    Object.entries(form).forEach(([key, value]) => {
      if (value.trim() !== "") params.append(key, value);
    });

    router.push(`/buscar?${params.toString()}`);

    setTimeout(() => {
      setForm({
        precio: "",
        transmision: "",
        ruta: "",
        vehiculo: "",
      });
    }, 200);
  };

  // 🔹 Auto-play del carrusel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  // 🔹 Redirección al hacer clic en la imagen
  const handleImageClick = () => {
    const currentImage = images[currentIndex];
    if (currentImage.link) router.push(currentImage.link);
  };

  return (
    <div
      className="relative w-full h-screen md:h-[90vh] 2xl:h-[90vh] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Contenedor principal para la imagen */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full cursor-pointer"
            onClick={handleImageClick}
          >
            {/* Imagen responsive: arriba en desktop, centrada en mobile */}
            <div className="w-full h-full flex items-start justify-start lg:items-center lg:justify-center">
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="w-full h-auto object-top lg:object-contain max-h-full pt-28 "
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 block bg-white/80 hover:bg-white text-gray-900 rounded-full cursor-pointer w-10 h-10 lg:w-12 lg:h-12 shadow-lg"
      >
        <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-900 rounded-full cursor-pointer w-10 h-10 lg:w-12 lg:h-12 shadow-lg"
      >
        <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
      </Button>

      {/* Search Form - Fijo en su posición */}
      <div className="absolute max-md:bottom-36 md:bottom-[-20px] left-1/2 -translate-x-1/2 z-20 w-full max-w-7xl px-4 pb-4 lg:pb-5">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-[#1100FF] shadow-2xl py-4 lg:py-6 px-4 lg:px-6 rounded-xl w-full"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
            {/* Texto descriptivo */}
            <div className="text-sm text-white text-center lg:text-left font-medium lg:w-[220px] leading-snug">
              Filtra el vehículo ideal para ti
            </div>

            {/* Contenedor de selects - Responsive */}
            <div className="flex flex-col sm:flex-row flex-grow gap-3 w-full lg:w-auto">
              {/* Precio */}
              <div className="flex flex-col text-white text-xs lg:text-sm w-full sm:w-1/4">
                <label className="font-medium">Precio (S/)</label>
                <select
                  name="precio"
                  value={form.precio}
                  onChange={handleChange}
                  className="mt-1 p-2 lg:p-3 rounded-md border border-white/50 text-black bg-white text-xs lg:text-sm"
                >
                  <option value="">Seleccionar</option>
                  {[120, 150, 180, 200, 250, 300].map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Transmisión */}
              <div className="flex flex-col text-white text-xs lg:text-sm w-full sm:w-1/4">
                <label className="font-medium">Transmisión</label>
                <select
                  name="transmision"
                  value={form.transmision}
                  onChange={handleChange}
                  className="mt-1 p-2 lg:p-3 rounded-md border border-white/50 text-black bg-white text-xs lg:text-sm"
                >
                  <option value="">Seleccionar</option>
                  <option value="Mecánico">Mecánico</option>
                  <option value="Automático">Automático</option>
                </select>
              </div>

              {/* Ruta */}
              <div className="flex flex-col text-white text-xs lg:text-sm w-full sm:w-1/4">
                <label className="font-medium">Ruta</label>
                <select
                  name="ruta"
                  value={form.ruta}
                  onChange={handleChange}
                  className="mt-1 p-2 lg:p-3 rounded-md border border-white/50 text-black bg-white text-xs lg:text-sm"
                >
                  <option value="">Seleccionar</option>
                  {rutasUnicas.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Vehículo */}
              <div className="flex flex-col text-white text-xs lg:text-sm w-full sm:w-1/4">
                <label className="font-medium">Vehículo</label>
                <select
                  name="vehiculo"
                  value={form.vehiculo}
                  onChange={handleChange}
                  className="mt-1 p-2 lg:p-3 rounded-md border border-white/50 text-black bg-white text-xs lg:text-sm"
                >
                  <option value="">Seleccionar</option>
                  {data.map((v) => (
                    <option key={v.id} value={v.slug}>
                      {v.marca} {v.modelo} / {v.especificaciones.pasajeros} asientos
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botón Buscar */}
            <Button
              type="submit"
              className="w-full lg:w-auto px-6 lg:px-8 py-2 bg-blue-900 hover:bg-red-600 text-white font-semibold rounded-md transition-all duration-300 text-sm lg:text-base"
            >
              Buscar
            </Button>
          </div>
        </motion.form>
      </div>

      {/* Indicators - Posición fija */}
      <div className="absolute bottom-28 lg:bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;