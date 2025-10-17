"use client"
import { motion, Variants } from 'framer-motion'; // 👈 Importamos 'Variants'
// Si usas Next.js, te recomiendo cambiar 'img' por 'Image'
// import Image from 'next/image';

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
              <h1 className="text-4xl font-extrabold text-indigo-700 mb-3">Misión</h1>
              <p className="text-gray-700 leading-relaxed">
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from &quot;de Finibus Bonorum et Malorum&quot; by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
              </p>
            </div>
            
            {/* Sección Visión */}
            <div>
              <h2 className="text-3xl font-bold text-indigo-600 mb-2">Visión</h2>
              <p className="text-gray-700 leading-relaxed">
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum&quot; by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
              </p>
            </div>
            
          </motion.div>
          
        </div>
        
      </div>
      
    </div>
  );
};

export default HeroNosotros;