"use client";

import { motion, Transition, Variants } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type }) => (
  <div className="flex flex-col mb-6">
    <label
      htmlFor={name}
      className="text-black text-xl font-medium mb-1 drop-shadow-sm"
    >
      {label}:
    </label>
    {type === "textarea" ? (
      <textarea
        id={name}
        name={name}
        rows={2}
        className="w-full bg-transparent border-b-2 border-indigo-700 focus:border-indigo-900 text-black outline-none transition-colors duration-300 resize-none"
      ></textarea>
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        className="w-full bg-transparent border-b-2 border-indigo-700 focus:border-indigo-900 text-black outline-none transition-colors duration-300"
      />
    )}
  </div>
);

const Formulario = () => {
  const [agreed, setAgreed] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.1,
      } as Transition,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const backgroundImageURL = "/fondoformulario.png";

  const titleStyle = {
    backgroundImage: "linear-gradient(90deg, #4F46E5, #3B82F6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 4px 6px rgba(0, 0, 0, 0.25)",
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden font-inter">
      {/* Fondo de pantalla completo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImageURL})`,
        }}
      ></div>

      {/* Contenido principal */}
      <motion.div
        className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row p-8 md:p-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Sección izquierda */}
        <motion.div
          className="w-full md:w-2/5 pr-8 mb-8 md:mb-0 md:pr-16"
          variants={itemVariants}
        >
          {/* 👇 Título con imagen al costado */}
          <motion.h1
            className="flex flex-col   gap-3 text-6xl md:text-7xl font-extrabold mb-4 leading-tight"
            style={titleStyle}
            variants={itemVariants}
          >
            <span>Hola</span>
            <Image
              src="/letrahome.png"
              alt="Letra decorativa"
              width={500}
              height={120}
              className=" align-middle object-contain"
              priority
            />
          </motion.h1>

          <motion.p
            className="text-gray-800 text-lg md:text-xl font-medium leading-relaxed max-w-md"
            variants={itemVariants}
          >
            Nuestro equipo de profesionales está listo para atender todas tus
            consultas y asistirte en todas tus necesidades.
          </motion.p>
        </motion.div>

        {/* Formulario */}
        <motion.form
          className="w-full md:w-3/5 p-4 md:p-6"
          variants={itemVariants}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <InputField label="Nombre" name="nombre" type="text" />
            <InputField label="Email" name="email" type="email" />
            <InputField label="Número" name="numero" type="tel" />
            <InputField label="DNI o CDE" name="dniCde" type="text" />
          </div>

          <InputField label="Mensaje" name="mensaje" type="textarea" />

          <div className="flex flex-col mt-4">
            <motion.div className="flex items-center mb-6" variants={itemVariants}>
              <input
                id="agree"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-5 h-5 text-indigo-700 border-gray-400 rounded focus:ring-indigo-600 cursor-pointer"
              />
              <label
                htmlFor="agree"
                className="ml-3 text-black text-lg font-medium cursor-pointer"
              >
                Estoy de acuerdo con dar mis datos personales.
              </label>
            </motion.div>

            <motion.button
              type="submit"
              disabled={!agreed}
              className={`px-8 py-3 text-lg font-bold rounded-lg transition-all duration-300 shadow-md
                ${
                  agreed
                    ? "bg-blue-600 hover:bg-blue-700 text-white transform hover:-translate-y-0.5"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              whileHover={agreed ? { scale: 1.02 } : {}}
              whileTap={agreed ? { scale: 0.98 } : {}}
              variants={itemVariants}
            >
              Enviar
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Formulario;
