"use client";

import { motion, Transition, Variants } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const customEase: Transition["ease"] = [0.42, 0, 0.58, 1.0];

const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, x: -75 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: customEase },
  },
};

const carAndFormVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.5, ease: customEase },
  },
};

const Hero: React.FC = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    precio: "",
    transmision: "",
    ruta: "",
    vehiculo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    Object.entries(form).forEach(([key, value]) => {
      if (value.trim() !== "") params.append(key, value);
    });

    router.push(`/buscar?${params.toString()}`);
  };

  return (
    <div className="relative overflow-hidden min-h-[90vh] flex flex-col py-20 sm:py-28">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-center z-0"
        style={{
          backgroundImage: `url(/herofondo.png)`,
          backgroundBlendMode: "multiply",
          opacity: 0.85,
        }}
      />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-grow flex flex-col lg:flex-row items-center pt-8 sm:pt-12 md:pt-16 px-4 sm:px-6 md:px-10">
        {/* Texto */}
        <motion.div
          className="w-full lg:w-1/2 pt-4 lg:pt-24 px-2 sm:px-4 text-center lg:text-left"
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#1100FF] leading-tight"
            variants={textItemVariants}
          >
            Conduce fácil y seguro
          </motion.h1>

          <div className="flex justify-center lg:justify-start">
            <Image
              src="/letrahome.png"
              alt="VELOXRENT Logo"
              className="w-[75%] lg:w-[85%] pt-6 md:pt-8 h-auto"
              width={500}
              height={120}
              priority
            />
          </div>
        </motion.div>

        {/* Imagen del coche */}
        <motion.div
          className="w-full lg:w-1/2 relative flex justify-center lg:justify-end mt-10 lg:mt-0"
          variants={carAndFormVariants}
          initial="hidden"
          animate="visible"
        >
          <Image
            src="/hero.png"
            alt="Vehículo de alquiler"
            width={700}
            height={500}
            className="w-full h-auto object-contain"
            priority
          />
        </motion.div>
      </div>

      {/* Formulario */}
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-7xl mx-auto z-30 bg-[#1100FF] shadow-2xl py-6 px-4 sm:px-6 md:px-8 mt-10 rounded-xl"
        variants={carAndFormVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="text-xs sm:text-sm text-white text-center md:text-left font-medium md:w-[220px] leading-snug px-2">
            Filtra el vehículo ideal para ti 
          </div>

          {/* Selects */}
          <div className="flex flex-col sm:flex-row flex-grow gap-3 sm:gap-4 w-full md:w-auto">

            {/* Precio */}
            <div className="flex flex-col text-white text-xs sm:text-sm w-full sm:w-1/4">
              <label className="font-medium">Precio (S/)</label>
              <select
                name="precio"
                value={form.precio}
                onChange={handleChange}
                className="mt-1 p-3 rounded-md border border-white/50 text-black bg-white"
              >
                <option value="">Seleccionar</option>
                {[120, 150, 180, 200, 250, 300].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Transmisión */}
            <div className="flex flex-col text-white text-xs sm:text-sm w-full sm:w-1/4">
              <label className="font-medium">Transmisión</label>
              <select
                name="transmision"
                value={form.transmision}
                onChange={handleChange}
                className="mt-1 p-3 rounded-md border border-white/50 text-black bg-white"
              >
                <option value="">Seleccionar</option>
                <option value="Mecánico">Mecánico</option>
                <option value="Automático">Automático</option>
              </select>
            </div>

            {/* Ruta */}
            <div className="flex flex-col text-white text-xs sm:text-sm w-full sm:w-1/4">
              <label className="font-medium">Ruta</label>
              <select
                name="ruta"
                value={form.ruta}
                onChange={handleChange}
                className="mt-1 p-3 rounded-md border border-white/50 text-black bg-white"
              >
                <option value="">Seleccionar</option>
                <option value="Asfaltado">Asfaltado</option>
                <option value="Agreste">Agreste</option>
              </select>
            </div>

            {/* Vehículo */}
            <div className="flex flex-col text-white text-xs sm:text-sm w-full sm:w-1/4">
              <label className="font-medium">Vehículo</label>
              <select
                name="vehiculo"
                value={form.vehiculo}
                onChange={handleChange}
                className="mt-1 p-3 rounded-md border border-white/50 text-black bg-white"
              >
                <option value="">Seleccionar</option>
                <option value="Chery Q22 / 08 asientos">Chery Q22 / 08 asientos</option>
                <option value="Hyundai Verna / 05 asientos">Hyundai Verna / 05 asientos</option>
                <option value="Hyundai Accent / 05 asientos">Hyundai Accent / 05 asientos</option>
                <option value="Mahindra Pick Up / 05 asientos">Mahindra Pick Up / 05 asientos</option>
                <option value="Daihatsu Terios / 08 asientos">Daihatsu Terios / 08 asientos</option>
                <option value="Toyota Hilux / 05 asientos">Toyota Hilux / 05 asientos</option>
                <option value="Hyundai Santa Fe / 08 asientos">Hyundai Santa Fe / 08 asientos</option>
                <option value="Hyundai H1 / 12 asientos">Hyundai H1 / 12 asientos</option>
              </select>
            </div>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full md:w-auto px-10 py-3 bg-blue-900 hover:bg-red-600 cursor-pointer text-white font-semibold rounded-md shadow-lg transition-all duration-300"
          >
            Buscar
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default Hero;
