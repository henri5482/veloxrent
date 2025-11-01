"use client";
import { Bebas_Neue } from "next/font/google";
import Image from "next/image";

const bebas = Bebas_Neue({
    subsets: ["latin"],
    weight: ["400"],
});

// Icono flecha circular ↓
function ArrowCircleDown({
    className = "w-16 h-16",
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

type MesItem = {
    month: string;
    items: {
        title: string;
        subtitle: string;
        img: string;
    }[];
};

// 📅 Datos según tu diseño original
const mesesData: MesItem[] = [
    {
        month: "ENERO",
        items: [
            {
                title: "Cenote de Chapalla",
                subtitle:
                    "El destino perfecto para los que aman nadar, la aventura y descubrir lugares nuevos, imprescindible si buscas disfrutar de la naturaleza de Ayacucho.",
                img: "/enero.png",
            },
        ],
    },
    {
        month: "FEBRERO",
        items: [
            {
                title: "Carnavales de Ayacucho",
                subtitle:
                    "Patrimonio Cultural del Perú, más de 100 comparsas participan en este desfile, ofreciendo un espectáculo visual único que destaca la diversidad y creatividad de las tradiciones culturales rendidas en homenaje a la Pachamama o 'Madre Tierra'.",
                img: "/febrero.png",
            },
        ],
    },
    {
        month: "MARZO",
        items: [
            {
                title: "Semana Santa",
                subtitle:
                    "Es una de las celebraciones religiosas más importantes del Perú, declarada Patrimonio Cultural de la Nación, que combina procesiones, arte, tradición andina, actividades extremas, diversión y mucha fe.",
                img: "/marzo.png",
            },
        ],
    },
    {
        month: "ABRIL",
        items: [
            {
                title: "La Ciudad de las 33 Iglesias",
                subtitle:
                    "Destacan la Catedral, Santo Domingo, La Merced, San Francisco de Asís, San Cristóbal, Santa Clara y la Compañía de Jesús. Ejemplos notables de arte colonial y barroco andino con altares tallados y cubiertos en pan de oro.",
                img: "/abril.png",
            },
        ],
    },
    {
        month: "MAYO",
        items: [
            {
                title: "Ciudadela Inca de Vilcashuamán",
                subtitle:
                    "Funcionó como centro administrativo y ceremonial del Imperio Inca, destacando el Templo del Sol y el Ushnu, una pirámide escalonada con una piedra sagrada para el Inca en la cima.",
                img: "/mayo.png",
            },
        ],
    },
    {
        month: "JUNIO",
        items: [
            {
                title: "La Pampa de la Quinua",
                subtitle:
                    "Ocurrió la Batalla de Ayacucho el 9 de diciembre de 1824, hito de la independencia nacional. Área natural protegida que alberga un valioso ecosistema de flora y fauna.",
                img: "/junio.png",
            },
        ],
    },
    {
        month: "JULIO",
        items: [
            {
                title: "Aguas Turquesas de Millpu",
                subtitle:
                    "Con 20 piscinas naturales color turquesa, este tesoro de la naturaleza forma un paisaje paradisíaco. El color se debe a los minerales del río y la luz solar.",
                img: "/julio.png",
            },
        ],
    },
    {
        month: "AGOSTO",
        items: [
            {
                title: "Complejo Arqueológico de Wari",
                subtitle:
                    "Expresión más compleja del urbanismo andino. Sus murallas, sectores y arquitectura planificada conservan alturas que sobrepasan los ocho metros del terreno actual.",
                img: "/agosto.png",
            },
        ],
    },
    {
        month: "SEPTIEMBRE",
        items: [
            {
                title: "Bosque de Puya de Raymondi",
                subtitle:
                    "Planta emblemática de los Andes peruanos. Puede alcanzar los 10 metros de altura y su inflorescencia es la más grande del reino vegetal, con miles de flores.",
                img: "/septiembre.png",
            },
        ],
    },
    {
        month: "OCTUBRE",
        items: [
            {
                title: "Ritipata",
                subtitle:
                    "Montaña en la Cordillera de los Andes con 5100 m.s.n.m. Ideal para crioterapia y terapia de frío por sus temperaturas extremadamente bajas.",
                img: "/octubre.png",
            },
        ],
    },
    {
        month: "NOVIEMBRE",
        items: [
            {
                title: "7 Cañones de Qorihuillca",
                subtitle:
                    "Formaciones rocosas con pasillos estrechos y coloridos por la erosión, ideales para trekking, rappel y escalada. Se recomienda ir con guía y equipo de seguridad.",
                img: "/noviembre.png",
            },
        ],
    },
    {
        month: "DICIEMBRE",
        items: [
            {
                title: "Aguas Termales del Volcán de Pachapupum",
                subtitle:
                    "Pozas de aguas termo-minerales y medicinales con alto contenido de azufre. Ubicadas junto al volcán Pachapupum, valoradas por sus propiedades curativas y su impresionante paisaje.",
                img: "/diciembre.png",
            },
        ],
    },
];

const MesCard = ({
    title,
    subtitle,
    img,
    align = "left",
}: {
    title: string;
    subtitle: string;
    img: string;
    align?: "left" | "right";
}) => {
    return (
        <div
            className={`grid grid-cols-1 md:grid-cols-12 items-center gap-4 md:gap-6`}
        >
            {/* Imagen */}
            <div
                className={`md:col-span-7 ${align === "right" ? "md:order-2" : "md:order-1"
                    }`}
            >
                <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]">
                    <Image
                        src={img}
                        alt={title}
                        width={1400}
                        height={900}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>

            {/* Texto */}
            <div
                className={`md:col-span-5 ${align === "right" ? "md:order-1" : "md:order-2"
                    }`}
            >
                <h3
                    className={`${bebas.className} text-[#1500ff] text-3xl sm:text-6xl leading-tight`}
                >
                    {title}
                </h3>
                <p className="mt-2 text-sm text-[#0f1a40] leading-relaxed">
                    {subtitle}
                </p>
                <div className="mt-20">
                    <ArrowCircleDown />
                </div>
            </div>
        </div>
    );
};

export default function Meses() {
    return (
        <section className="relative overflow-hidden">
            {/* Fondo */}
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
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 mb-12">
                    <div className="md:col-span-5 space-y-4">
                        <p className="text-[#1100FF] text-sm font-semibold border-b-2 border-[#1100FF] inline-block pb-1 mb-3">
                            Una ruta de destinos que no encontrarás en Google
                        </p>
                        <h1
                            className={`${bebas.className} text-[#1500ff] text-6xl sm:text-7xl md:text-8xl leading-[0.9]`}
                        >
                            LAS MIL
                            <br />
                            CARAS DE
                            <br />
                            AYACUCHO
                        </h1>
                        <p className="text-[#0f1a40] text-[14px] leading-relaxed max-w-md font-medium">
                            Destinos dentro y fuera de la ciudad, arquitectura, historia,
                            costumbres, tradición, maravillas naturales y actividades
                            culturales organizadas en todos los meses del año.
                        </p>
                        <div className="mt-5">
                            <ArrowCircleDown />
                        </div>
                    </div>

                    <div className="md:col-span-7 flex justify-center">
                        <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]">
                            <Image
                                src="/heromeses.png"
                                alt="Las mil caras de Ayacucho"
                                width={1000}
                                height={700}
                                className="w-full h-auto object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Meses */}
                <div className="space-y-12 sm:space-y-16">
                    {mesesData.map((mes, idx) => (
                        <div key={mes.month} className="space-y-4">
                            <h2
                                className={`${bebas.className} text-[#1500ff] text-5xl sm:text-6xl md:text-7xl`}
                            >
                                {mes.month}
                            </h2>
                            {mes.items.map((it, i) => (
                                <MesCard
                                    key={`${mes.month}-${i}`}
                                    title={it.title}
                                    subtitle={it.subtitle}
                                    img={it.img}
                                    align={idx % 2 === 0 ? "left" : "right"}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
