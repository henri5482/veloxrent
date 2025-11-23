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
                            En VELOXRENT, nuestra misión es ofrecer un servicio de alquiler de vehículos confiable, seguro y accesible, priorizando la satisfacción y comodidad de cada cliente. Nos comprometemos a brindar una experiencia ágil y transparente, garantizando unidades en óptimas condiciones y atención personalizada en cada etapa del servicio. Trabajamos día a día con responsabilidad, innovación y cercanía, buscando consolidarnos como la mejor opción en movilidad dentro de la región.                        </p>
                    </div>

                    {/* Sección 2: ¿Por qué elegirnos? (Fondo Oscuro/Colorido) */}
                    <div className="bg-[#5451e7]/90 backdrop-blur-sm p-8 md:p-16 rounded-xl shadow-2xl border-t-4 border-white transition duration-300 hover:shadow-3xl hover:border-gray-300 text-white">
                        <h1 className={`${bebas.className} text-4xl sm:text-6xl font-extrabold text-white mb-8 text-center`}>
                            Visión
                        </h1>

                        <div className="space-y-6">
                            <p className="text-lg leading-relaxed text-justify">
                              
                            Ser reconocidos en los próximos años como la empresa líder en alquiler de vehículos en Ayacucho, destacando por la calidad del servicio, la confianza de nuestros clientes y el crecimiento sostenible de nuestra marca. Aspiramos a expandirnos a nuevas ciudades del país, fortaleciendo nuestra presencia y contribuyendo al desarrollo regional a través de soluciones de transporte modernas, seguras y orientadas al cliente.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Nosotros