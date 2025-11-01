"use client"
import { motion, Variants } from 'framer-motion'; // 👈 Importamos 'Variants'
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});
// Definimos las URLs de las imágenes
const BACKGROUND_IMAGE_URL = '/bgnosotroshero.png';
const HERO_IMAGE_URL = '/heronosotros.png';

// 1. Tipar las variantes explícitamente con 'Variants' de Framer Motion
const textVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    // Tipado de la transición ahora es seguro
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.2
    }
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    // Tipado de la transición ahora es seguro
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0
    }
  },
};

const HeroNosotros = () => {
  return (
    // Contenedor principal para el fondo
    <div className="relative min-h-[500px] py-16  overflow-hidden">

      {/* Fondo Fijo */}
      <div
        className="absolute inset-0 z-0 bg-cover "
        style={{
          backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`,
          backgroundAttachment: '',
        }}
      />

      {/* Contenedor del contenido */}
      <div className="relative z-10 container mx-auto px-4 pt-10 md:pt-40">

        {/* Estructura de dos columnas */}
        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* Columna Izquierda: Imagen */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
          >
            {/* ⚠️ Nota: ESLint sugiere usar el componente <Image /> de Next.js. 
               Si estás en Next.js, descomenta el import y usa <Image /> en su lugar.
            */}
            <img
              src={HERO_IMAGE_URL}
              alt="Sobre Nosotros"
              className="xl:max-w-2xl h-auto rounded-lg shadow-2xl"
            />
          </motion.div>

          {/* Columna Derecha: Texto */}
          <motion.div
            className="w-full md:w-1/2 space-y-8 p-6 "
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >

            {/* Sección Misión */}
            <div>
              <h1 className={`${bebas.className} text-7xl font-extrabold text-blue-900 mb-3`}>
                ¿Quiénes somos?
              </h1>
              <p className="text-gray-700 leading-relaxed text-lg ">
                Somos una empresa Ayacuchana, pionera en el mercado del alquiler de vehículos sin chofer en Huamanga, damos suma importancia a la libertad y experiencia del cliente, estamos en el rubro desde enero del 2025.
              </p>
            </div>

            {/* Sección Visión */}
            <div>
              <h2 className={`${bebas.className} text-7xl font-bold text-blue-900 mb-2`}>
                ¿Por qué elegirnos?
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Cuando dimos el primer paso para iniciar establecimos premisas concisas que nos ayudarían a establecernos como una empresa y marca sólida, pero también nos servirían para diferenciarnos de otras empresas.

                En Huamanga - Ayacucho nos destacamos por brindarte un servicio privado y libre, donde el conductor es el cliente, ganando así autonomía y libertad. Una experiencia que antes no se encontraba en la ciudad.

                También nos diferenciamos por brindarte una propuesta que equilibra precio y experiencia, con opciones para que tu viaje sea mas sencillo y sin preocupaciones.
              </p>
            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
};

export default HeroNosotros;