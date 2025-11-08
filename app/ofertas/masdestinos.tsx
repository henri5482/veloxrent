"use client";
import { Bebas_Neue } from "next/font/google";
import Image from "next/image";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

// Icono flecha circular ↓
function ArrowCircleDown({
  className = "w-14 h-14",
  stroke = "#2140CF",
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="20" stroke={stroke} strokeWidth="3" />
      <path
        d="M24 14v16m0 0l-7-7m7 7l7-7"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const Masdestinos = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Fondo original */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/fondocomentario.webp')",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
        {/* Cabecera */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 mb-10">
          <div className="md:col-span-6 flex justify-between items-center">
            <h1
              className={`${bebas.className} text-[#1500ff] text-6xl sm:text-7xl md:text-8xl leading-[0.9]`}
            >
              MAS DESTINOS
            </h1>
            <ArrowCircleDown />
          </div>
        </div>

        {/* Imagen pequeña centrada */}
        <div className="flex justify-center mt-6">
          <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden ">
            <Image
              src="/masdestinos.png"
              alt="Mapa de destinos turísticos"
              width={1000}
              height={700}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Masdestinos;
