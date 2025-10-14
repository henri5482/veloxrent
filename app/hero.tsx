// app/components/Hero.tsx
"use client";

import { motion, Transition, Variants } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

// --- Configuración de Animaciones ---
const customEase: Transition['ease'] = [0.42, 0, 0.58, 1.0];

const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        }
    },
};

const textItemVariants: Variants = {
    hidden: { opacity: 0, x: -75 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.7,
            ease: customEase
        }
    },
};

const carAndFormVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            delay: 0.5,
            ease: customEase
        }
    },
};

const Hero: React.FC = () => {

    const placeholderValues = {
        destino: '',
        fechaSalida: '',
        fechaRetorno: '',
        vehiculoAsientos: '',
    };

    // Rutas de imágenes
    const BACKGROUND_IMAGE_URL = '/herofondo.png';
    const CAR_IMAGE_URL = '/hero.png';
    const LOGO_TEXT_IMAGE_URL = '/letrahome.png';

    return (
        <div className="relative overflow-hidden min-h-[90vh] flex flex-col py-20 sm:py-28 ">

            {/* Fondo */}
            <div
                className="absolute inset-0  bg-center z-0"
                style={{
                    backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
                    backgroundBlendMode: 'multiply',
                    opacity: 0.85
                }}
            />

            {/* Contenido principal */}
            <div className="relative z-10 max-w-7xl mx-auto w-full flex-grow flex flex-col lg:flex-row  items-center lg:items-start pt-8 max-md:pb-10 sm:pt-12 md:pt-16 px-4 sm:px-6 md:px-10">

                {/* Texto */}
                <motion.div
                    className="w-full lg:w-1/2 pt-4 lg:pt-24 px-2 sm:px-4 flex-shrink-0 order-2 lg:order-1 text-center lg:text-left"
                    variants={textContainerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#1100FF] leading-tight tracking-tight"
                        variants={textItemVariants}
                    >
                        Conduce
                    </motion.p>
                    <motion.p
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#1100FF] leading-tight tracking-tight mt-2"
                        variants={textItemVariants}
                    >
                        fácil y seguro. conduce
                    </motion.p>

                    <div className="flex justify-center lg:justify-start">
                        <Image
                            src={LOGO_TEXT_IMAGE_URL}
                            alt='VELOXRENT Logo'
                            className="w-[70%] sm:w-[60%] md:w-[75%] lg:w-[80%] xl:w-[90%] pt-6 md:pt-8 h-auto"
                            width={500}
                            height={120}
                            priority
                        />
                    </div>
                </motion.div>

                {/* Imagen del coche */}
                <div className="w-full lg:w-1/2 relative min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[600px] flex justify-center lg:justify-end order-1 lg:order-2 px-2 sm:px-4">
                    <motion.div
                        className="relative w-[90%] sm:w-[80%] md:w-[70%] lg:w-[90%] max-w-xl lg:mt-16"
                        variants={carAndFormVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Image
                            src={CAR_IMAGE_URL}
                            alt="Vehículo de alquiler"
                            width={700}
                            height={500}
                            className="w-full h-auto object-contain"
                            priority
                        />
                    </motion.div>
                </div>
            </div>

            {/* Formulario */}
            <motion.div
                className="max-w-7xl mx-auto z-30 bg-[#1100FF] shadow-2xl py-6 px-4 sm:px-6 md:px-8"
                variants={carAndFormVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8">

                    {/* Nota de ubicación */}
                    <div className="text-xs sm:text-sm text-white text-center md:text-left font-medium md:w-[220px] leading-snug px-2">
                        Todos los vehículos salen y retornan de nuestra oficina en Huamanga
                    </div>

                    {/* Inputs */}
                    <div className="flex flex-col sm:flex-row flex-grow gap-3 sm:gap-4 w-full md:w-auto">

                        {/* Input: Destino */}
                        <div className="flex flex-col text-white text-xs sm:text-sm w-full sm:w-1/4">
                            <label htmlFor="destino" className="font-medium">Destino</label>
                            <input
                                id="destino"
                                name="destino"
                                type="text"
                                value={placeholderValues.destino}
                                readOnly
                                className="mt-1 p-2 sm:p-3 rounded-md border border-white/50 text-black bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            />
                        </div>

                        {/* Input: Fecha de salida */}
                        <div className="flex flex-col text-white text-xs sm:text-sm w-full sm:w-1/4">
                            <label htmlFor="fechaSalida" className="font-medium">Fecha de salida</label>
                            <input
                                id="fechaSalida"
                                name="fechaSalida"
                                type="text"
                                value={placeholderValues.fechaSalida}
                                readOnly
                                className="mt-1 p-2 sm:p-3 rounded-md border border-white/50 text-black bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            />
                        </div>

                        {/* Input: Fecha de retorno */}
                        <div className="flex flex-col text-white text-xs sm:text-sm w-full sm:w-1/4">
                            <label htmlFor="fechaRetorno" className="font-medium">Fecha de retorno</label>
                            <input
                                id="fechaRetorno"
                                name="fechaRetorno"
                                type="text"
                                value={placeholderValues.fechaRetorno}
                                readOnly
                                className="mt-1 p-2 sm:p-3 rounded-md border border-white/50 text-black bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            />
                        </div>

                        {/* Input: Vehículo / Asientos */}
                        <div className="flex flex-col text-white text-xs sm:text-sm w-full sm:w-1/4">
                            <label htmlFor="vehiculoAsientos" className="font-medium">Vehículo / Asientos</label>
                            <input
                                id="vehiculoAsientos"
                                name="vehiculoAsientos"
                                type="text"
                                value={placeholderValues.vehiculoAsientos}
                                readOnly
                                className="mt-1 p-2 sm:p-3 rounded-md border border-white/50 text-black bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            />
                        </div>
                    </div>

                    {/* Botón */}
                    <button
                        className="w-full md:w-auto px-8 sm:px-10 py-2.5 sm:py-3 bg-[#2800FF] hover:bg-[#1f00b9] text-white font-semibold rounded-md shadow-lg transition-all duration-300 ease-in-out"
                    >
                        COTIZAR
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
