/* eslint-disable @next/next/no-img-element */
"use client";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

// --- Rutas de Iconos (Ajustar si es necesario) ---
const ICON_PATHS = {
  education: "/cita.png",
  certificate: "/carro.png",
  community: "/usuario.png",
  support: "/cara-feliz.png",
};

// Datos de los pasos del proceso (Manteniendo los datos originales)
const beneficiosData = [
  {
    title: "PLANEA",
    description: "Elige tu vehículo, precio y más",
    imagePath: ICON_PATHS.education,
    alt: "Icono de Calendario (Planear)",
  },
  {
    title: "SELECCIONA",
    description: "Compara la información detallada de nuestros vehículos",
    imagePath: ICON_PATHS.certificate,
    alt: "Icono de Coche (Seleccionar)",
  },
  {
    title: "SOLICITA",
    description: "Completa los datos y envía la Solicitud de Reserva",
    imagePath: ICON_PATHS.community,
    alt: "Icono de Usuario (Solicitar)",
  },
  {
    title: "DISFRUTA",
    description: "Evaluamos y aprobamos tu solicitud",
    imagePath: ICON_PATHS.support,
    alt: "Icono de Cara Feliz (Disfrutar)",
  },
];

// --- DATOS DE PLANES DE ALQUILER DE VEHÍCULOS (ACTUALIZADOS) ---
const planesData = [
  {
    name: "PLAN NORMAL",
    duration: "Diario",
    price: 120.0,
    recurrence: "Desde S/120.00 por día",
    savings: null,
    installments: "INCLUYE 150 KM POR DÍA",
    features: [
      { text: "Hyundai Verna: S/180.00", included: true },
      { text: "Hyundai Accent: S/150.00", included: true },
      { text: "Minivanes: S/120.00", included: true },
      { text: "Daihatsu Terios: S/200.00", included: true },
      { text: "Hyundai Santa Fe: S/250.00", included: true },
      { text: "Toyota Hilux: S/250.00", included: true },
      { text: "Hyundai H1: S/300.00", included: true },
      { text: "Mahindra Pick Up: S/180.00", included: true },
      { text: "Costo KM extra: S/ 0.90", included: true },
      { text: "Atención Personalizada", included: true },
      { text: "Asistencia en Ruta", included: true },
    ],
    buttonText: "Reservar Plan Normal",
    buttonClass: "bg-green-500 text-white hover:bg-green-600",
  },
  {
    name: "PLAN PLUS",
    duration: "Diario",
    price: 150.0,
    savings: "¡MÁS KILÓMETROS INCLUIDOS!",
    installments: "INCLUYE 200 KM POR DÍA",
    recurrence: "Desde S/150.00 por día",
    features: [
      { text: "Hyundai Verna: S/210.00", included: true },
      { text: "Hyundai Accent: S/180.00", included: true },
      { text: "Minivanes: S/150.00", included: true },
      { text: "Daihatsu Terios: S/230.00", included: true },
      { text: "Hyundai Santa Fe: S/280.00", included: true },
      { text: "Toyota Hilux: S/280.00", included: true },
      { text: "Hyundai H1: S/330.00", included: true },
      { text: "Mahindra Pick Up: S/210.00", included: true },
      { text: "Costo KM extra: S/ 0.60", included: true },
      { text: "Atención Personalizada", included: true },
      { text: "Asistencia en Ruta", included: true },
    ],
    buttonText: "¡Reservar Plan Plus ahora!",
    buttonClass: "bg-green-600 text-white hover:bg-green-700",
    isRecommended: true,
    borderColor: "border-blue-400",
  },
  {
    name: "PLAN LIBRE",
    duration: "Diario",
    price: 270.0,
    savings: "¡KILOMETRAJE ILIMITADO!",
    installments: "INCLUYE KM LIBRE",
    recurrence: "Desde S/270.00 por día",
    features: [
      { text: "Hyundai Verna: S/330.00", included: true },
      { text: "Hyundai Accent: S/300.00", included: true },
      { text: "Minivanes: S/270.00", included: true },
      { text: "Daihatsu Terios: S/350.00", included: true },
      { text: "Hyundai Santa Fe: S/400.00", included: true },
      { text: "Toyota Hilux: S/400.00", included: true },
      { text: "Hyundai H1: S/450.00", included: true },
      { text: "Mahindra Pick Up: S/330.00", included: true },
      { text: "Costo KM extra: No aplica", included: true },
      { text: "Atención Personalizada", included: true },
      { text: "Asistencia en Ruta", included: true },
    ],
    buttonText: "Reservar Plan Libre",
    buttonClass: "bg-green-500 text-white hover:bg-green-600",
    borderColor: "border-blue-400",
  },
];

// --- COMPONENTE DE PLANES DE PRECIOS (solo cambia el contenido, no el layout general) ---
const PlanesPrecios = () => {
  // Helpers para formatear como la imagen
  const kmBadge = (planName: string, installments?: string) => {
    if (!installments) return "";
    if (/LIBRE/i.test(planName)) return "KILOMETRAJE ILIMITADO";
    return installments.replace(/^INCLUYE\s*/i, "");
  };

  const extraFromFeatures = (features: { text: string }[]) => {
    const f = features.find((x) => /costo\s*km\s*extra/i.test(x.text));
    return f ? f.text.replace(/.*:\s*/i, "").trim() : "";
  };

  const splitVehiculoPrecio = (txt: string) => {
    const [izq, der] = txt.split(":");
    return { izq: (izq ?? "").trim(), der: (der ?? "").trim() };
  };

  return (
    <section className="py-20 relative z-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className={`${bebas.className} text-3xl sm:text-7xl font-extrabold text-[#1100FF] text-center mb-16`}
        >
          Conoce nuestros planes
        </h2>

        {/* ⬇️ Mantengo tu grid/espaciados/colores de tarjeta base */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {planesData.map((plan) => {
            const isRecommended = plan.isRecommended;
            const cardBg = isRecommended ? "bg-[#2539C4]/50" : "bg-[#2539C4]/50";
            const borderColorClass = isRecommended ? "border-blue-400" : "border-blue-800";
            const shadowClass = isRecommended ? "shadow-xl shadow-blue-500/20" : "shadow-lg shadow-blue-900/10";

            const kmText = kmBadge(plan.name, plan.installments);
            const extraText = extraFromFeatures(plan.features);

            return (
              <div
                key={plan.name}
                className={`flex flex-col rounded-xl p-6 lg:p-8 transition duration-300 relative ${cardBg} ${borderColorClass} ${shadowClass} border hover:scale-[1.02]`}
              >
                {/* Barra superior: PLAN ... (similar a la foto) */}
                <div className="w-full rounded-lg bg-[#2140cf] text-center py-3 mb-5">
                  <h3 className={`${bebas.className} text-2xl lg:text-3xl font-extrabold uppercase`}>
                    {plan.name}
                  </h3>
                </div>

                {/* Cintas: roja (KM) y azul (KM extra) */}
                <div className="flex flex-col gap-2 mb-6">
                  {kmText && (
                    <span className="inline-block self-center bg-red-600 text-white font-extrabold uppercase tracking-wide rounded-md px-3 py-1 text-xs sm:text-2xl text-center shadow-md">
                      {kmText}
                    </span>
                  )}
                  {extraText && !/No aplica/i.test(extraText) && (
                    <span className="inline-block self-center bg-[#2140cf] text-white font-extrabold uppercase rounded-md px-3 py-1 text-xs sm:text-2xl shadow-inner">
                      {`S/ ${extraText.replace(/^S\/?\s*/i, "")} POR KM EXTRA`}
                    </span>
                  )}
                </div>

                {/* Bloque central: Atención personalizada y asistencia en ruta */}
                <div className="bg-[#1732b9] rounded-lg px-4 py-4 shadow-inner mb-6">
                  <p className={`${bebas.className} text-white text-2xl text-center leading-6`}>
                    ATENCIÓN PERSONALIZADA
                    <br />
                    Y ASISTENCIA EN RUTA
                  </p>
                </div>

                {/* Lista de vehículos y precios en dos columnas */}
                <div className="mb-2">
                  <ul className="space-y-2">
                    {plan.features.slice(0, 8).map((f, idx) => {
                      const { izq, der } = splitVehiculoPrecio(f.text);
                      return (
                        <li
                          key={idx}
                          className="grid grid-cols-[1fr_auto] gap-3 text-sm font-semibold text-blue-100 border-b border-blue-800 pb-1"
                        >
                          <span className="uppercase">{izq}</span>
                          <span className="text-right">{der}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Badge inferior como refuerzo (km o ilimitado) */}
                {/* <div className="mt-auto pt-4">
                  <div className="rounded-lg px-4 py-2 text-center font-bold uppercase bg-[#2140cf]">
                    {kmText || "INFORMACIÓN DEL PLAN"}
                  </div>
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTE DEL PROCESO DE ALQUILER (igual que tenías) ---
const ProcesoAlquiler = () => (
  <section className="py-10 relative z-10 bg-transparent">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        className={`${bebas.className} text-3xl sm:text-7xl font-black text-[#1100FF] text-center mb-16`}
      >
        ¿Cómo funciona el procedimiento?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {beneficiosData.map((beneficio) => (
          <div
            key={beneficio.title}
            className="bg-white rounded-xl border border-blue-100 flex flex-col items-center text-center overflow-hidden transition duration-300 shadow-xl hover:shadow-2xl"
          >
            <div className="flex flex-col items-center justify-center p-6 pb-0 w-full">
              <div className="mb-4 w-20 h-20 p-4 rounded-full bg-[#1100FF] flex items-center justify-center shadow-lg">
                <img
                  src={beneficio.imagePath}
                  alt={beneficio.alt}
                  style={{ width: "40px", height: "40px" }}
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://placehold.co/40x40/1100FF/ffffff?text=Icon";
                  }}
                />
              </div>
              <h3 className="text-lg font-extrabold text-[#1100FF] uppercase pt-4 pb-4 w-full">
                {beneficio.title}
              </h3>
              <div className="border-b border-gray-200 w-[90%] mx-auto"></div>
            </div>
            <div className="flex-grow flex items-start justify-center p-6 pt-4">
              <p className="text-sm text-gray-700 leading-relaxed max-w-xs">
                {beneficio.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- COMPONENTE PRINCIPAL (mantiene el fondo que ya tenías) ---
const AlquilerYPlanes = () => {
  const backgroundImage = "/fondoproceso.png";

  return (
    <div
      className="relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ProcesoAlquiler />
      <PlanesPrecios />
    </div>
  );
};

export default AlquilerYPlanes;
