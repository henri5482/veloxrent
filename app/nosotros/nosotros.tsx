import { Bebas_Neue } from "next/font/google";

const BACKGROUND_IMAGE_URL = '/bgnosotroshero.png';
const bebas = Bebas_Neue({
    subsets: ["latin"],
    weight: ["400"],
});
const Nosotros = () => {
    return (
        // Contenedor principal: Hace que el fondo absoluto funcione y define un padding general
        <div className="relative min-h-screen py-20 md:py-32">

            {/* Fondo Fijo: Asegura que el fondo cubra todo y se posicione detrás del contenido (z-0) */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`,
                    // Usamos 'fixed' para un efecto parallax sutil y asegurar que cubra la altura
                    backgroundAttachment: '',
                }}
            />

            {/* Contenedor de Contenido: Se posiciona sobre el fondo (z-10) */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Estructura de las Secciones */}
                <div className="flex flex-col gap-16">

                    {/* Sección 1: ¿Quiénes somos? (Fondo Claro) */}
                    <div className="bg-white/95 backdrop-blur-sm p-8 md:p-16 rounded-xl shadow-2xl border-t-4 border-[#1100FF] transition duration-300 hover:shadow-3xl hover:border-blue-700">
                        <h1 className={`${bebas.className} text-4xl sm:text-6xl font-extrabold text-[#1100FF] mb-6 text-center`}>
                            Misión
                        </h1>
                        <p className="text-gray-700 text-lg leading-relaxed text-justify">
                         Somos una empresa dedicada al alquiler de vehículos, creada para satisfacer las necesidades de movilidad de nuestros clientes mediante unidades en óptimas condiciones y un servicio transparente y personalizado garantizando una experiencia cómoda y confiable. Asimismo, impulsamos el desarrollo y bienestar de nuestro equipo, conscientes de que su compromiso es esencial para mantener la calidad del servicio y generar valor en cada atención que brindamos.                        </p>
                    </div>

                    {/* Sección 2: ¿Por qué elegirnos? (Fondo Oscuro/Colorido) */}
                    <div className="bg-[#1100FF] backdrop-blur-sm p-8 md:p-16 rounded-xl shadow-2xl border-t-4 border-white transition duration-300 hover:shadow-3xl hover:border-gray-300 text-white">
                        <h1 className={`${bebas.className} text-4xl sm:text-6xl font-extrabold text-white mb-8 text-center`}>
                            Visión
                        </h1>

                        <div className="space-y-6">
                            <p className="text-lg leading-relaxed text-justify">
                              
                            Ser la empresa líder en alquiler de vehículos para uso particular y turístico en la región, reconocidos por nuestra excelencia en atención al cliente, la calidad de nuestras unidades y el cumplimiento estricto de nuestras políticas de uso responsable.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Nosotros