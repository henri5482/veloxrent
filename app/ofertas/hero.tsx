"use client";
import { Bebas_Neue } from "next/font/google";
import Image from "next/image";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

function ArrowCircleDown({
  className = "w-10 h-10",
  stroke = "#2140CF",
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
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

export default function HeroPlanes() {
  return (
    <section
      className="relative overflow-hidden pt-36"
      aria-label="Nuestros planes"
    >
      {/* Fondo con patrón (puedes cambiar la imagen si tienes tu propio fondo) */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/fondocomentario.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Fracciones angulares claras para emular el diseño */}
      <div className="pointer-events-none absolute -left-24 -top-10 w-[60%] aspect-[5/3] rotate-[18deg]  rounded-3xl blur-[1px]" />
      <div className="pointer-events-none absolute right-0 top-0 w-[45%] aspect-[5/3] -rotate-[16deg]  rounded-3xl blur-[1px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
          {/* Título a la izquierda */}
          <div className="lg:col-span-5">
            <h1
              className={`${bebas.className} text-[#1500ff] text-6xl sm:text-7xl lg:text-8xl xl:text-9xl`}
            >
              NUESTROS
              <br />
              PLANES
            </h1>
          </div>

          {/* Imagen a la derecha en tarjeta */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]">
              <Image
                src="/heroofertas.png" // cámbiala si tienes otra
                alt="Familia viajando en automóvil"
                width={1400}
                height={800}
                className="w-full h-auto"
                priority
              />
              {/* Sombra base suave */}
              <div className="absolute -bottom-3 left-10 right-10 h-6 rounded-full bg-black/20 blur-xl" />
            </div>
          </div>
        </div>

        {/* Icono circular con flecha (esquina inferior izquierda) */}
        <div className="mt-6 sm:mt-8">
          <ArrowCircleDown className="w-10 h-10 sm:w-16 sm:h-16" stroke="#1500ff" />
        </div>
      </div>
    </section>
  );
}
