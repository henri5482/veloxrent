"use client";
import { Bebas_Neue } from "next/font/google";

import { animate, motion, useInView, Variants } from "framer-motion";
import React, { useEffect, useRef } from "react";
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});
// Componente para animar el conteo de un número
const CountingNumber: React.FC<{
  value: number;
  duration?: number;
  suffix?: string;
  start?: boolean;
}> = ({ value, duration = 2, suffix = "", start = false }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (node && start) {
      const controller = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          node.textContent = Math.round(latest).toLocaleString() + suffix;
        },
      });
      return () => controller.stop();
    }
  }, [value, duration, suffix, start]);

  return <span ref={nodeRef}>0{suffix}</span>;
};

const Numeros = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewContainer = useInView(containerRef, { once: true, amount: 0.3 });

  const stats = [
    { id: 1, label: "Reservas web en el último  mes", value: 43, suffix: "+" },
    { id: 2, label: "Clientes en el útimo mes", value: 37, suffix: "+" },
    { id: 3, label: "Días alquilados en el último  mes", value: 86, suffix: "+" },
    { id: 4, label: "Kilómetros recorridos en  el último mes", value: 13050, suffix: "+" },
  ];

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const statCardVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 18,
      },
    },
  };

  return (
    <section className="py-20 sm:py-28 px-6 relative overflow-hidden  text-white flex flex-col items-center justify-center text-center">
      {/* Título centrado */}
      <motion.h2
        className={`${bebas.className} text-3xl sm:text-4xl md:text-7xl font-extrabold mb-16 text-center leading-tight text-[#1100FF]`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Las cifras <span className="text-[#1100FF]">nos respaldan</span>
      </motion.h2>


      {/* Contenedor de estadísticas */}
      <motion.div
        ref={containerRef}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-center"
        variants={sectionVariants}
        initial="hidden"
        animate={isInViewContainer ? "visible" : "hidden"}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            className="flex flex-col items-center justify-center p-8 bg-[#1100FF] rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-[#223A59]/40"
            variants={statCardVariants}
          >
            <div className="text-6xl sm:text-7xl font-extrabold mb-4 text-white drop-shadow-lg">
              <CountingNumber
                value={stat.value}
                suffix={stat.suffix}
                duration={4}
                start={isInViewContainer}
              />
            </div>
            <p className="text-sm sm:text-base text-gray-200 uppercase tracking-wide font-bold">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Numeros;
