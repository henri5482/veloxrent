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
                            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from **de Finibus Bonorum et Malorum** by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                        </p>
                    </div>

                    {/* Sección 2: ¿Por qué elegirnos? (Fondo Oscuro/Colorido) */}
                    <div className="bg-[#5451e7]/90 backdrop-blur-sm p-8 md:p-16 rounded-xl shadow-2xl border-t-4 border-white transition duration-300 hover:shadow-3xl hover:border-gray-300 text-white">
                        <h1 className={`${bebas.className} text-4xl sm:text-6xl font-extrabold text-white mb-8 text-center`}>
                            Visión
                        </h1>

                        <div className="space-y-6">
                            <p className="text-lg leading-relaxed text-justify">
                                <span className="font-bold text-yellow-300">Experiencia:</span> The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                            </p>
                            <p className="text-lg leading-relaxed text-justify">
                                <span className="font-bold text-yellow-300">Soporte 24/7:</span> The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                            </p>
                            <p className="text-lg leading-relaxed text-justify">
                                <span className="font-bold text-yellow-300">Calidad Garantizada:</span> The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Nosotros