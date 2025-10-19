"use client";

import { motion, Transition, Variants } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  maxLength?: number;
  pattern?: string;
  title?: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  name, 
  type, 
  value, 
  onChange, 
  disabled, 
  maxLength,
  pattern,
  title 
}) => (
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
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full bg-transparent border-b-2 border-indigo-700 focus:border-indigo-900 text-black outline-none transition-colors duration-300 resize-none disabled:opacity-50"
      ></textarea>
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        maxLength={maxLength}
        pattern={pattern}
        title={title}
        className="w-full bg-transparent border-b-2 border-indigo-700 focus:border-indigo-900 text-black outline-none transition-colors duration-300 disabled:opacity-50"
      />
    )}
  </div>
);

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    numero: "",
    dniCde: "",
    mensaje: "",
  });

  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

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

  const backgroundImageURL = "/fondoformulario.webp";

  const titleStyle = {
    backgroundImage: "linear-gradient(90deg, #4F46E5, #3B82F6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 4px 6px rgba(0, 0, 0, 0.25)",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Validaciones en tiempo real
    if (name === "numero") {
      // Solo números y máximo 9 caracteres para teléfono
      if (/^\d{0,9}$/.test(value)) {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else if (name === "dniCde") {
      // Solo números y máximo 8 caracteres para DNI
      if (/^\d{0,8}$/.test(value)) {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else if (name === "email") {
      // Para email, permitir cualquier caracter pero validar después
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      // Para nombre y mensaje, permitir cualquier caracter
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Limpiar mensajes de error cuando el usuario empiece a escribir
    if (message) {
      setMessage("");
      setIsError(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones antes de enviar
    if (!agreed) {
      setMessage("Debes aceptar el tratamiento de datos personales");
      setIsError(true);
      return;
    }

    if (!formData.nombre || !formData.email || !formData.numero) {
      setMessage("Los campos Nombre, Email y Número son obligatorios");
      setIsError(true);
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("Por favor ingresa un email válido");
      setIsError(true);
      return;
    }

    // Validación de teléfono (exactamente 9 dígitos)
    if (!/^\d{9}$/.test(formData.numero)) {
      setMessage("El número de teléfono debe tener exactamente 9 dígitos");
      setIsError(true);
      return;
    }

    // Validación de DNI (8 dígitos si está lleno)
    if (formData.dniCde && !/^\d{8}$/.test(formData.dniCde)) {
      setMessage("El DNI debe tener exactamente 8 dígitos");
      setIsError(true);
      return;
    }

    setIsSubmitting(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el formulario');
      }

      // Éxito
      setMessage('¡Gracias! Tu mensaje ha sido enviado correctamente.');
      setIsError(false);
      
      // Resetear formulario
      setFormData({
        nombre: "",
        email: "",
        numero: "",
        dniCde: "",
        mensaje: "",
      });
      setAgreed(false);

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al enviar el formulario';
      setMessage(`Error al enviar: ${errorMessage}`);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
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
            className="flex flex-col gap-3 text-6xl md:text-7xl font-extrabold mb-4 leading-tight"
            style={titleStyle}
            variants={itemVariants}
          >
            <span>Hola</span>
            <Image
              src="/letrahome.png"
              alt="Letra decorativa"
              width={500}
              height={120}
              className="align-middle object-contain"
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
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <InputField 
              label="Nombre" 
              name="nombre" 
              type="text" 
              value={formData.nombre}
              onChange={handleChange}
              disabled={isSubmitting}
              maxLength={50}
            />
            <InputField 
              label="Email" 
              name="email" 
              type="email" 
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Por favor ingresa un email válido (ejemplo: usuario@correo.com)"
            />
            <InputField 
              label="Número" 
              name="numero" 
              type="tel" 
              value={formData.numero}
              onChange={handleChange}
              disabled={isSubmitting}
              maxLength={9}
              pattern="[0-9]{9}"
              title="Ingresa 9 dígitos sin espacios (ejemplo: 912345678)"
            />
            <InputField 
              label="DNI o CDE" 
              name="dniCde" 
              type="text" 
              value={formData.dniCde}
              onChange={handleChange}
              disabled={isSubmitting}
              maxLength={8}
              pattern="[0-9]{0,8}"
              title="Ingresa 8 dígitos para DNI (opcional)"
            />
          </div>

          <InputField 
            label="Mensaje" 
            name="mensaje" 
            type="textarea" 
            value={formData.mensaje}
            onChange={handleChange}
            disabled={isSubmitting}
            maxLength={500}
          />

          

          {/* Mensaje de estado */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg mb-4 ${
                isError 
                  ? "bg-red-100 border border-red-400 text-red-700" 
                  : "bg-green-100 border border-green-400 text-green-700"
              }`}
            >
              {message}
            </motion.div>
          )}

          <div className="flex flex-col mt-4">
            <motion.div className="flex items-center mb-6" variants={itemVariants}>
              <input
                id="agree"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                disabled={isSubmitting}
                className="w-5 h-5 text-indigo-700 border-gray-400 rounded focus:ring-indigo-600 cursor-pointer disabled:opacity-50"
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
              disabled={!agreed || isSubmitting}
              className={`px-8 py-3 text-lg font-bold rounded-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2
                ${
                  agreed && !isSubmitting
                    ? "bg-blue-600 hover:bg-blue-700 text-white transform hover:-translate-y-0.5 cursor-pointer"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              whileHover={agreed && !isSubmitting ? { scale: 1.02 } : {}}
              whileTap={agreed && !isSubmitting ? { scale: 0.98 } : {}}
              variants={itemVariants}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Enviando...
                </>
              ) : (
                "Enviar"
              )}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Formulario;