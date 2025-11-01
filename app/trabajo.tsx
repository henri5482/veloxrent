import { Bebas_Neue } from "next/font/google";
import Image from "next/image";

const bebas = Bebas_Neue({
    subsets: ["latin"],
    weight: ["400"],
});

const Trabajo = () => {
    // Cambia este número si corresponde
    const whatsapp = "51989900609";
    const mensaje = encodeURIComponent(
        "Hola, me gustaría postular a Veloxrent. Adjunto mis datos y CV."
    );

    return (
        <section className="relative">
            {/* Fondo (mantienes tu imagen) */}
            <div
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage: "url('/fondocomentario.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            {/* Sutil superposición para contraste */}
            <div className="absolute inset-0 -z-10 bg-white/10" />

            <div className="max-w-7xl mx-auto px-4  py-10 lg:py-16">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Imagen izquierda */}
                    <div className="w-full lg:w-[65%]">
                        <div className="relative rounded-2xl overflow-hidden ">
                            <Image
                                src="/trabajo.png"
                                alt="Equipo de trabajo Veloxrent"
                                width={1100}
                                height={740}
                                className="w-full h-auto"
                                priority
                            />
                            {/* Pequeña sombra base simulando tarjeta flotante */}
                            <div className="absolute -bottom-3 left-8 right-8 h-6 rounded-full blur-xl " />
                        </div>
                    </div>

                    {/* Panel derecho */}
                    <div className="w-full lg:w-[48%]">
                        {/* Título grande azul tipo afiche */}
                        <h1
                            className={`${bebas.className} text-[#1100FF] leading-none text-5xl sm:text-6xl lg:text-7xl xl:text-[120px] font-extrabold`}
                        >
                            TRABAJA CON
                            <br />
                            NOSOTROS
                        </h1>

                        {/* Subtítulo y separador */}
                        <div className="mt-5">
                            <p className="text-[#0c0280] text-lg sm:text-xl font-black">
                                Únete al equipo de Veloxrent
                            </p>
                            <div className="mt-3 h-[3px] w-[285px] bg-[#0c0280] rounded-full" />
                        </div>

                        {/* Botón WhatsApp */}
                        <div className="mt-6">
                            <a
                                href={`https://wa.me/${whatsapp}?text=${mensaje}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-2xl bg-[#1500ff] text-white font-extrabold tracking-wide px-6 sm:px-8 py-4 shadow-lg hover:shadow-xl transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#1500ff]/30"
                                aria-label="Postula vía WhatsApp"
                            >
                                POSTULA VÍA WHATSAPP
                            </a>
                        </div>

                        {/* Requisitos */}
                        <div className="mt-5 text-[#0c0280]">
                            <p className="font-semibold text-[18px]">Adjuntando esta información:</p>
                            <ul className="mt-3 space-y-0 text-[18px] font-black leading-relaxed">
                                <li className="flex gap-2">
                                    <span className="text-[#0c0280] font-bold">-</span>
                                    Nombre Completo y DNI
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-[#0c0280] font-bold">-</span>
                                    Dirección
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-[#0c0280] font-bold">-</span>
                                    ¿Cuál día elegirías para descansar?
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-[#0c0280] font-bold">-</span>
                                    Indica tu puesto y adjunta tu CV
                                </li>
                            </ul>

                            <p className="mt-4 text-sm text-[#1500ff] font-bold">
                                (*Administración, Ingeniería Industrial, Supervisión, Contabilidad, Operario
                                Vehicular, Chofer, Ventas, Marketing u Otro)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Trabajo;
