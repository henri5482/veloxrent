"use client";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
    subsets: ["latin"],
    weight: ["400"],
});
// --- Rutas de Iconos (Ajustar si es necesario) ---
const ICON_PATHS = {
    education: '/cita.png',
    certificate: '/carro.png',
    community: '/usuario.png',
    support: '/cara-feliz.png',
};

// Datos de los pasos del proceso (Manteniendo los datos originales)
const beneficiosData = [
    {
        title: "PLANEA",
        description: "Elige tu vehículo, precio y más",
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
        description: "Evaluamos y aprobamos tu solicitud",
        imagePath: ICON_PATHS.support,
        alt: "Icono de Cara Feliz (Disfrutar)"
    },
];

// --- DATOS DE PLANES DE ALQUILER DE VEHÍCULOS (ACTUALIZADOS) ---
const planesData = [
    {
        name: "PLAN NORMAL",
        duration: "Diario",
        price: 120.00, // Precio más bajo (Minivanes)
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
        price: 150.00, // Precio más bajo (Minivanes)
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
        borderColor: "border-blue-400"
    },
    {
        name: "PLAN LIBRE",
        duration: "Diario",
        price: 270.00, // Precio más bajo (Minivanes)
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
        borderColor: "border-blue-400"
    },
];

// --- COMPONENTE DE PLANES DE PRECIOS ---
const PlanesPrecios = () => {
    // CheckIcon verde brillante para todos los planes en el nuevo diseño
    const CheckIcon = ({ className = "w-5 h-5 text-green-400" }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
    );

    const XIcon = ({ className = "w-5 h-5 text-red-500" }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    );

    // 📱 Número de WhatsApp (Cámbialo por el tuyo)
    const whatsappNumber = "51987654321";

    return (
        <section className="py-20 relative z-10 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* El título se mantiene oscuro para que contraste si el fondo de imagen es claro */}
                <h2
                    className={`${bebas.className} text-3xl sm:text-7xl font-extrabold text-[#1100FF] text-center mb-16`}
                >
                    Conoce nuestros planes
                </h2>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {planesData.map((plan) => {
                        const isRecommended = plan.isRecommended;
                        const cardBg = isRecommended ? 'bg-[#1F3A5F]' : 'bg-[#1F3A5F]'; // Fondos oscuros se mantienen para las tarjetas
                        const borderColorClass = isRecommended ? 'border-blue-400' : 'border-blue-800';
                        const shadowClass = isRecommended ? 'shadow-xl shadow-blue-500/20' : 'shadow-lg shadow-blue-900/10';
                        const savingsBg = isRecommended ? 'bg-blue-400' : 'bg-red-600';
                        const installmentsBg = isRecommended ? 'bg-blue-600' : 'bg-blue-800';
                        const installmentsBorder = isRecommended ? 'border-blue-400' : 'border-blue-700';
                        const buttonColor = isRecommended ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600';


                        return (
                            <div
                                key={plan.name}
                                className={`flex flex-col rounded-xl p-8 transition duration-300 relative ${cardBg} ${borderColorClass} ${shadowClass} border ${isRecommended ? 'lg:scale-105' : ''} hover:scale-[1.02]`}
                            >
                                {plan.savings && (
                                    <div className="absolute top-0 inset-x-0 -mt-4 flex justify-center">
                                        <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-white ${savingsBg} rounded-full shadow-md`}>
                                            {plan.savings}
                                        </span>
                                    </div>
                                )}

                                <div className="text-center pb-6 border-b border-blue-700 mb-6">
                                    <h3 className="text-2xl font-bold uppercase text-white mb-2">{plan.name}</h3>
                                    <p className="text-sm text-blue-200 mt-1">{plan.duration}</p>

                                    <div className="mt-4">
                                        <p className="text-xl font-bold text-blue-300 leading-none">DESDE</p>
                                        <p className="text-6xl font-black text-white">S/{plan.price.toFixed(2)}</p>
                                        <p className="text-sm text-blue-300 mt-1 invisible h-5">Espacio</p>
                                    </div>
                                </div>

                                <ul className="flex-grow space-y-3 mb-6">
                                    <li className="flex items-start mb-2 border-b border-blue-800 pb-2">
                                        <span className="text-sm font-semibold leading-relaxed text-blue-300 uppercase">
                                            VEHÍCULOS Y PRECIOS POR DÍA:
                                        </span>
                                    </li>
                                    {plan.features.slice(0, 8).map((feature, idx) => (
                                        <li key={idx} className="flex items-start text-sm">
                                            <CheckIcon className="w-4 h-4 mt-1 flex-shrink-0 text-green-400" />
                                            <span className="ml-2 leading-relaxed text-blue-100">
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                    <li className="flex items-start mt-4 mb-2 border-b border-blue-800 pb-2">
                                        <span className="text-sm font-semibold leading-relaxed text-blue-300 uppercase">
                                            INCLUYE:
                                        </span>
                                    </li>
                                    {plan.features.slice(8).map((feature, idx) => (
                                        <li key={idx + 8} className="flex items-start">
                                            <CheckIcon className="w-5 h-5 text-green-400" />
                                            <span className="ml-3 text-sm leading-relaxed text-blue-100">
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {plan.installments && (
                                    <div className="mt-auto text-center pt-6">
                                        <div className={`py-2 px-4 rounded-lg text-sm font-bold text-white ${installmentsBorder} ${installmentsBg} border`}>
                                            {plan.installments}
                                        </div>
                                    </div>
                                )}

                                {/* Botón con enlace directo a WhatsApp */}
                                <button
                                    onClick={() =>
                                        window.open(
                                            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                                                `Hola, estoy interesado en el ${plan.name} de ${plan.duration}, el cual incluye ${plan.installments}.`
                                            )}`,
                                            "_blank"
                                        )
                                    }
                                    className={`cursor-pointer mt-8 w-full py-3 rounded-lg font-bold transition duration-300 text-lg ${buttonColor} shadow-lg`}
                                >
                                    {plan.buttonText}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

// --- COMPONENTE DEL PROCESO DE ALQUILER ---
const ProcesoAlquiler = () => (
    // Se elimina el div de fondo y se ajusta la sección para que el fondo de la imagen se vea
    <section className="py-10 relative z-10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
                className={`${bebas.className} text-3xl sm:text-7xl font-black text-[#1100FF] text-center mb-16`}
            >
                ¿Cómo funciona el procedimiento?
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
            className="relative"
            // El fondo se aplica aquí para que cubra ambos subcomponentes
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