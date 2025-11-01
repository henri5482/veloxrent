"use client";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

// Icono circular con flecha
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

// --- DATA: edita aquí los videos y precios ---
type PriceItem = { label: string; price: string };
type PlanInfo = {
  key: "normal" | "plus" | "libre";
  title: string;
  videoId: string; // solo el id de youtube (lo que va después de v=)
  kmBadge: string; // “150KM POR DÍA”, “200KM POR DÍA”, “KM LIBRE POR DÍA”
  pricesLeft: PriceItem[]; // columna izquierda (3-4 ítems)
  pricesRight: PriceItem[]; // columna derecha
  extra?: string; // “Costo KM extra S/0.90” u omitido si no aplica
};

const plansData: PlanInfo[] = [
  {
    key: "normal",
    title: "PLAN NORMAL",
    videoId: "dQw4w9WgXcQ", // <-- REEMPLAZA por tu ID de YouTube
    kmBadge: "150KM POR DÍA",
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
    videoId: "kXYiU_JCYtU", // <-- REEMPLAZA
    kmBadge: "200KM POR DÍA",
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
    videoId: "3JZ_D3ELwOQ", // <-- REEMPLAZA
    kmBadge: "KM LIBRE POR DÍA",
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
    ],
  },
];

// --- Tarjeta de precios pequeña (estilo afiche) ---
function PriceCard({
  title = "PRECIOS INCREÍBLES",
  kmBadge,
  extra,
  left,
  right,
  align = "right", // "left" o "right" para ubicarla respecto al video
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
      className={`max-w-xs sm:max-w-sm rounded-xl bg-[#0B1DBA] text-white px-4 py-4 sm:px-5 sm:py-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.45)] border border-[#1c2df0]/40 ${
        align === "left" ? "ml-2 sm:ml-4" : "mr-2 sm:mr-4"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className={`${bebas.className} text-white leading-5 text-xl sm:text-2xl`}
          >
            {title}
          </p>
        </div>
        <div className="text-right">
          <span className="inline-block bg-[#1100FF] text-white px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-extrabold">
            {kmBadge}
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] sm:text-sm">
        {[...left, ...right].map((it, i) => {
          const isLeft = i < left.length;
          const item = isLeft ? left[i] : right[i - left.length];
        return (
            <div
              key={`${it.label}-${i}`}
              className={`flex items-center justify-between border-b border-white/15 py-1 ${
                isLeft ? "" : ""
              }`}
            >
              <span className="text-white/90">{it.label}</span>
              <span className="font-semibold">{it.price}</span>
            </div>
          );
        })}
      </div>

      {extra && (
        <div className="mt-3">
          <span className="inline-block bg-[#1830E1] px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-bold">
            {extra}
          </span>
        </div>
      )}
    </div>
  );
}

// --- Iframe de YouTube responsivo ---
function Youtube({ videoId }: { videoId: string }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden bg-[#1100FF] aspect-video shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title="Video del plan"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

const Planes = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Fondo con tu imagen */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(255,255,255,.65), rgba(255,255,255,.65)), url('/fondocomentario.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {plansData.map((plan, idx) => {
          // Alternar diseño: Normal (vídeo izquierda, card derecha), Plus (card izquierda), Libre (card derecha)
          const videoFirst = idx !== 1; // para el del medio invertimos
          return (
            <div key={plan.key} className="mb-14 sm:mb-20">
              {/* Título del plan */}
              <h2
                className={`${bebas.className} text-[#1100FF] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight`}
              >
                {plan.title}
              </h2>

              {/* Contenido  */}
              <div
                className={`mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center`}
              >
                {videoFirst ? (
                  <>
                    <div className="lg:col-span-8 order-1">
                      <Youtube videoId={plan.videoId} />
                    </div>
                    <div className="lg:col-span-4 order-2 lg:justify-self-end">
                      <PriceCard
                        kmBadge={plan.kmBadge}
                        extra={plan.extra}
                        left={plan.pricesLeft}
                        right={plan.pricesRight}
                        align="right"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="lg:col-span-4 order-2 lg:order-1 lg:justify-self-start">
                      <PriceCard
                        title="RECORRE MÁS"
                        kmBadge={plan.kmBadge}
                        extra={plan.extra}
                        left={plan.pricesLeft}
                        right={plan.pricesRight}
                        align="left"
                      />
                    </div>
                    <div className="lg:col-span-8 order-1 lg:order-2">
                      <Youtube videoId={plan.videoId} />
                    </div>
                  </>
                )}
              </div>

              {/* Flecha decorativa abajo */}
              {/* <div className="mt-4 sm:mt-6 flex">
                <ArrowCircleDown className="w-8 h-8 sm:w-10 sm:h-10" stroke="#1100FF" />
              </div> */}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Planes;
