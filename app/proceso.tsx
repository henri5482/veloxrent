"use client";

// --- Rutas de Iconos (Ajustar si es necesario) ---
const ICON_PATHS = {
  education: '/cita.png',
  certificate: '/carro.png',
  community: '/usuario.png',
  support: '/cara-feliz.png',
};

// Datos de los pasos del proceso
const beneficiosData = [
  {
    title: "PLANEA",
    description: "Elige tu destino, fechas y vehículo",
    imagePath: ICON_PATHS.education,
    alt: "Icono de Calendario (Planear)"
  },
  {
    title: "SELECCIONA",
    description: "Compara la información detallada de nuestros vehículos",
    imagePath: ICON_PATHS.certificate,
    alt: "Icono de Coche (Seleccionar)"
  },
  {
    title: "SOLICITA",
    description: "Completa los datos y envía la Solicitud de Reserva",
    imagePath: ICON_PATHS.community,
    alt: "Icono de Usuario (Solicitar)"
  },
  {
    title: "DISFRUTA",
    description: "Evaluamos, aprobamos, pagas y recoges tu vehículo listo",
    imagePath: ICON_PATHS.support,
    alt: "Icono de Cara Feliz (Disfrutar)"
  },
];

// --- DATOS DE PLANES DE PRECIOS ---
const planesData = [
  {
    name: "Plan Basic",
    duration: "Trimestral",
    price: 199,
    recurrence: "Cobro mensual recurrente",
    savings: null,
    installments: null,
    features: [
      { text: "Para 1 estudiante", included: true },
      { text: "Acceso ilimitado a todos los cursos durante 3 meses", included: true },
      { text: "Descarga de contenido", included: true },
      { text: "Certificados digitales por cada curso completado", included: true },
      { text: "Acceso a eventos exclusivos y comunidad", included: false },
      { text: "Soporte prioritario 24/7", included: false },
    ],
    buttonText: "Suscríbete a Plan Basic",
    buttonClass: "bg-[#343a40] text-white hover:bg-[#495057]",
  },
  {
    name: "Plan Master",
    duration: "Semestral",
    price: 299,
    savings: "AHORRAS 7 MESES",
    installments: "Paga a 3 cuotas sin intereses de S/100",
    recurrence: null,
    features: [
      { text: "Para 1 estudiante", included: true },
      { text: "Acceso a mas de 10 cursos pasados", included: true },
      { text: "Acceso ilimitado a todos los cursos en vivo durante 6 meses", included: true },
      { text: "Certificados digitales por cada curso completado", included: true },
      { text: "Soporte prioritario 24/7", included: true },
      { text: "Descarga de contenido", included: true },
      { text: "Proyectos prácticos y mentorías personalizadas", included: false },
      { text: "Acceso a eventos exclusivos y comunidad", included: false },
    ],
    buttonText: "Suscríbete a Plan Master",
    buttonClass: "bg-[#28a745] text-white hover:bg-[#218838]",
    isRecommended: true,
    borderColor: "border-[#1100FF]"
  },
  {
    name: "Plan Expert",
    duration: "Anual",
    price: 499,
    savings: "AHORRAS 9 MESES",
    installments: "Paga a 3 cuotas sin intereses de S/166",
    recurrence: null,
    features: [
      { text: "Para 1 estudiante", included: true },
      { text: "Acceso a mas de 20 cursos pasados", included: true },
      { text: "Acceso ilimitado a todos los cursos en vivo", included: true },
      { text: "Certificados digitales por cada curso completado", included: true },
      { text: "Proyectos prácticos y mentorías personalizadas", included: true },
      { text: "Acceso a eventos exclusivos y comunidad", included: true },
      { text: "Soporte prioritario 24/7", included: true },
      { text: "Descarga de contenido", included: true },
    ],
    buttonText: "Suscríbete a Plan Expert",
    buttonClass: "bg-[#28a745] text-white hover:bg-[#218838]",
    borderColor: "border-[#1100FF]"
  },
];

// --- COMPONENTE DE PLANES DE PRECIOS ---
const PlanesPrecios = () => {
  const CheckIcon = ({ className = "w-5 h-5 text-[#28a745]" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
  );

  const XIcon = ({ className = "w-5 h-5 text-red-500" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
  );

  // 📱 Número de WhatsApp (Cámbialo por el tuyo)
  const whatsappNumber = "51987654321";

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1100FF] text-center mb-16">
          Nuestros Planes de Suscripción
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {planesData.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-xl p-6 shadow-2xl bg-white border-2 transition duration-300 relative ${plan.borderColor || 'border-gray-200'} ${plan.isRecommended ? 'scale-105 shadow-3xl' : ''}`}
              style={{
                boxShadow: plan.isRecommended
                  ? '0 10px 15px -3px rgba(17, 0, 255, 0.2), 0 4px 6px -2px rgba(17, 0, 255, 0.1)'
                  : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
              }}
            >
              {plan.savings && (
                <div className="absolute top-0 inset-x-0 -mt-4 flex justify-center">
                  <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-[#1100FF] rounded-full shadow-md">
                    {plan.savings}
                  </span>
                </div>
              )}

              <div className="text-center pb-6 border-b border-gray-200">
                <h3 className={`text-xl font-bold uppercase ${plan.borderColor ? 'text-[#1100FF]' : 'text-gray-900'}`}>{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.duration}</p>

                <div className="mt-4">
                  <p className="text-5xl font-black text-gray-900">S/{plan.price}</p>
                  {plan.recurrence ? (
                    <p className="text-sm text-gray-500 mt-1">{plan.recurrence}</p>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1 invisible h-5">Oculto</p>
                  )}
                </div>
              </div>

              <ul className="mt-6 space-y-3 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    {feature.included ? <CheckIcon /> : <XIcon />}
                    <span className={`ml-3 text-sm leading-relaxed ${feature.included ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.installments && (
                <div className="mt-6 text-center">
                  <div className="py-2 px-4 rounded-lg text-sm font-semibold text-gray-700 border border-gray-300">
                    {plan.installments}
                  </div>
                </div>
              )}

              {/* 🔗 Botón con enlace directo a WhatsApp */}
              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                      `Hola, estoy interesado en el ${plan.name} (${plan.duration}) de S/${plan.price}.`
                    )}`,
                    "_blank"
                  )
                }
                className={`cursor-pointer mt-8 w-full py-3 rounded-lg font-bold transition duration-150 shadow-md ${plan.buttonClass}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTE DEL PROCESO DE ALQUILER ---
const ProcesoAlquiler = () => (
  <section className="py-10 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-5xl font-black text-[#1100FF] text-center mb-16">
        ¿Cuál es el proceso de alquiler?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {beneficiosData.map((beneficio) => (
          <div key={beneficio.title} className="bg-white rounded-xl border border-blue-100 flex flex-col items-center text-center overflow-hidden transition duration-300 shadow-xl hover:shadow-2xl">
            <div className="flex flex-col items-center justify-center p-6 pb-0 w-full">
              <div className="mb-4 w-20 h-20 p-4 rounded-full bg-[#1100FF] flex items-center justify-center shadow-lg">
                <img
                  src={beneficio.imagePath}
                  alt={beneficio.alt}
                  style={{ width: '40px', height: '40px' }}
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

// --- COMPONENTE PRINCIPAL ---
const AlquilerYPlanes = () => {
  const backgroundImage = "/fondoproceso.png";

  return (
    <div
      className="relative "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <ProcesoAlquiler />
      <PlanesPrecios />
    </div>
  );
};

export default AlquilerYPlanes;
