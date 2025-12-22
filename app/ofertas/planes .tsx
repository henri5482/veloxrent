"use client";

import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

// Icono circular con flecha (opcional)
function ArrowCircleDown({
  className = "w-9 h-9",
  stroke = "#1100FF",
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

// --- DATA ---
type PriceItem = { label: string; price: string };
type PlanInfo = {
  key: "normal" | "plus" | "libre";
  title: string;
  videoId: string;
  kmBadge: string;
  pricesLeft: PriceItem[];
  pricesRight: PriceItem[];
  extra?: string;
};

const plansData: PlanInfo[] = [
  {
    key: "normal",
    title: "PLAN NORMAL",
    videoId: "_rUHPZXoHDc",
    kmBadge: "200KM POR 24 HORAS",
    pricesLeft: [
      { label: "Minivan Q22", price: "S/ 120.00" },
      { label: "Auto Accent", price: "S/ 150.00" },
      { label: "Auto Verna", price: "S/ 180.00" },
      { label: "Camioneta Pick Up", price: "S/ 180.00" },
    ],
    pricesRight: [
      { label: "Camioneta Terios", price: "S/ 200.00" },
      { label: "Camioneta Santa Fe", price: "S/ 250.00" },
      { label: "Camioneta Hilux", price: "S/ 250.00" },
      { label: "Minivan H1", price: "S/ 300.00" },
    ],
    extra: "S/ 0.90 POR KM EXTRA",
  },
  {
    key: "plus",
    title: "PLAN PLUS",
    videoId: "itYCEYPdKO8",
    kmBadge: "300KM POR 24 HORAS",
    pricesLeft: [
      { label: "Minivan Q22", price: "S/ 150.00" },
      { label: "Auto Accent", price: "S/ 180.00" },
      { label: "Auto Verna", price: "S/ 210.00" },
      { label: "Camioneta Pick Up", price: "S/ 210.00" },
    ],
    pricesRight: [
      { label: "Camioneta Terios", price: "S/ 230.00" },
      { label: "Camioneta Santa Fe", price: "S/ 280.00" },
      { label: "Camioneta Hilux", price: "S/ 280.00" },
      { label: "Minivan H1", price: "S/ 330.00" },
    ],
    extra: "S/ 0.60 POR KM EXTRA",
  },
  {
    key: "libre",
    title: "PLAN LIBRE",
    videoId: "WtzDWWSHwUo",
    kmBadge: "KM LIBRE POR 24 HORAS",
    pricesLeft: [
      { label: "Minivan Q22", price: "S/ 270.00" },
      { label: "Auto Accent", price: "S/ 300.00" },
      { label: "Auto Verna", price: "S/ 330.00" },
      { label: "Camioneta Terios", price: "S/ 350.00" },
    ],
    pricesRight: [
      { label: "Camioneta Santa Fe", price: "S/ 400.00" },
      { label: "Camioneta Hilux", price: "S/ 400.00" },
      { label: "Minivan H1", price: "S/ 450.00" },
      { label: "Camioneta Pick Up", price: "S/ 330.00" },
    ],
  },
];

// --- Tarjeta de precios ---
function PriceCard({
  title = "PRECIOS INCREÍBLES",
  kmBadge,
  extra,
  left,
  right,
  align = "right",
}: {
  title?: string;
  kmBadge: string;
  extra?: string;
  left: PriceItem[];
  right: PriceItem[];
  align?: "left" | "right";
}) {
  return (
    <div
      className={`w-full h-full flex flex-col justify-between rounded-2xl bg-[#0B1DBA] text-white px-5 py-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.45)] border border-[#1c2df0]/40 ${
        align === "left" ? "ml-2 sm:ml-4" : "mr-2 sm:mr-4"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <p className={`${bebas.className} text-white text-2xl sm:text-3xl`}>
            {title}
          </p>
          <span className="bg-[#1100FF] text-white px-3 py-1 rounded-md text-xs font-extrabold">
            {kmBadge}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:text-base">
          {[...left, ...right].map((it, i) => {
            const isLeft = i < left.length;
            const item = isLeft ? left[i] : right[i - left.length];
            return (
              <div
                key={`${it.label}-${i}`}
                className="flex items-center justify-between border-b border-white/15 py-1"
              >
                <span className="text-white/90">{item.label}</span>
                <span className="font-semibold">{item.price}</span>
              </div>
            );
          })}
        </div>
      </div>

      {extra && (
        <div className="mt-4">
          <span className="inline-block bg-[#1830E1] px-3 py-1 rounded-md text-xs font-bold">
            {extra}
          </span>
        </div>
      )}
    </div>
  );
}

// --- Componente principal ---
const Planes = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Fondo */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(255,255,255,.65), rgba(255,255,255,.65)), url('/fondocomentario.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {plansData.map((plan, idx) => {
          const videoFirst = idx !== 1; // el del medio invertido

          return (
            <div key={plan.key} className="mb-14 sm:mb-20">
              <h2
                className={`${bebas.className} text-[#1100FF] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-center lg:text-left`}
              >
                {plan.title}
              </h2>

              <div
                className={`mt-6 flex flex-col lg:flex-row items-stretch gap-6 ${
                  videoFirst ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Video */}
                <div className="flex-1 flex items-stretch">
                  <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#1100FF] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${plan.videoId}?rel=0&modestbranding=1`}
                      title={`Video ${plan.title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>

                {/* Cuadro de precios */}
                <div className="flex-1 flex items-stretch">
                  <PriceCard
                    title={plan.key === "plus" ? "RECORRE MÁS" : "PRECIOS INCREÍBLES"}
                    kmBadge={plan.kmBadge}
                    extra={plan.extra}
                    left={plan.pricesLeft}
                    right={plan.pricesRight}
                    align={videoFirst ? "right" : "left"}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Planes;
