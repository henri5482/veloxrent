"use client";
import { Bebas_Neue } from "next/font/google";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion, Variants } from "framer-motion";
import { StarIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Numeros from "./numeros";
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});
interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
}

// 🟢 Testimonios actualizados — relacionados con alquiler de autos
const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Luis Quispe",
    role: "Cliente — Lima, Perú",
    avatar: "/comentario01.jpg",
    comment:
      "Alquilé una camioneta en VeloxRent para un viaje familiar y el servicio fue impecable. Vehículo nuevo, limpio y la atención muy amable. 100% recomendado.",
    rating: 5,
  },
  {
    id: 2,
    name: "Fiorella Huamán",
    role: "Cliente — Ayacucho, Perú",
    avatar: "/comentario02.jpg",
    comment:
      "Reservé un auto para mi viaje de trabajo y la entrega fue súper rápida. Todo el proceso fue digital y sin complicaciones. Excelente experiencia.",
    rating: 4,
  },
  {
    id: 3,
    name: "Renzo Paredes",
    role: "Cliente — Cusco, Perú",
    avatar: "/comentario03.jpg",
    comment:
      "Veloxrent me salvó el fin de semana. Pude alquilar un carro a último momento y todo salió perfecto. Los precios son justos y los autos están en excelente estado.",
    rating: 5,
  },
  {
    id: 4,
    name: "Camila Vargas",
    role: "Cliente — Arequipa, Perú",
    avatar: "/comentario04.jpg",
    comment:
      "Muy buena atención. Me entregaron el auto directamente en el aeropuerto y la devolución fue rápida. Definitivamente volveré a alquilar con ellos.",
    rating: 5,
  },
  {
    id: 5,
    name: "Jorge Alvarado",
    role: "Cliente — Huancayo, Perú",
    avatar: "/comentario05.jpg",
    comment:
      "El vehículo estaba impecable y en perfecto estado mecánico. El servicio al cliente fue excelente, resolvieron mis dudas en minutos por WhatsApp.",
    rating: 4,
  },
  {
    id: 6,
    name: "Natalie Yupanqui",
    role: "Cliente — Trujillo, Perú",
    avatar: "/comentario06.jpg",
    comment:
      "Alquilé un auto para mi boda y todo salió increíble. El vehículo estaba decorado y listo a tiempo. Agradezco el trato personalizado de VeloxRent.",
    rating: 5,
  },
  {
    id: 7,
    name: "Carlos Mejía",
    role: "Cliente — Piura, Perú",
    avatar: "/alumno05.webp",
    comment:
      "He alquilado varias veces con VeloxRent y siempre cumplen. Los autos son modernos, seguros y el servicio al cliente es de primera.",
    rating: 3,
  },
];

// ✅ Variantes de animación
const sectionHeaderVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

const carouselItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  }),
};

export default function SuccessStoriesCarousel() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const getCarouselItemBasis = useCallback(() => {
    if (isMobile) return "basis-full";
    if (isTablet) return "basis-1/2";
    return "basis-1/3";
  }, [isMobile, isTablet]);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-gray-50 overflow-hidden relative">
      {/* Fondo */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/fondocomentario.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="relative z-10">
        {/* Encabezado */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <motion.h2
            className={`${bebas.className} text-3xl sm:text-4xl md:text-7xl font-extrabold mb-16 text-center leading-tight text-[#1100FF]`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Nuestros clientes hablan por nosotros
          </motion.h2>
          <motion.p
            className="text-[#1100FF] text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionHeaderVariants}
          >
            Conoce las experiencias reales de quienes confiaron en{" "}
            <strong>Veloxrent</strong> para sus viajes, vacaciones y necesidades
            de transporte.
          </motion.p>
        </div>

        {/* Carrusel */}
        <div className="max-w-7xl mx-auto relative px-4">
          <Carousel
            plugins={[autoplay.current]}
            className="w-full"
            opts={{ align: "start", loop: true }}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={testimonial.id}
                  className={`pl-4 ${getCarouselItemBasis()}`}
                >
                  <motion.div
                    custom={index}
                    variants={carouselItemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                      transition: { type: "spring", stiffness: 200, damping: 15 },
                    }}
                    className="h-full transform transition-all duration-300"
                  >
                    <Card className="p-4 sm:p-6 lg:p-8 bg-white/90 text-gray-800 border border-[#ddd] rounded-xl h-full flex flex-col justify-between shadow-lg hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden">
                      <CardHeader className="flex flex-row items-start gap-3 p-0 pb-4 sm:gap-4 sm:pb-5">
                        <Avatar className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-2 border-blue-600 flex-shrink-0 shadow-md">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-lg sm:text-xl">
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-700 mb-0 sm:mb-1">
                            {testimonial.name}
                          </CardTitle>
                          <CardDescription className="text-sm sm:text-base text-gray-600">
                            {testimonial.role}
                          </CardDescription>
                          <div className="flex items-center gap-0.5 mt-1 sm:mt-2">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={`star-${testimonial.id}-${i}`}
                                className={`w-4 h-4 sm:w-5 sm:h-5 ${i < testimonial.rating
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "fill-gray-300 text-gray-300"
                                  }`}
                              />
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0 text-sm sm:text-base leading-relaxed flex-grow overflow-hidden pt-3">
                        <blockquote className="italic text-gray-700 pl-3 border-l-4 border-blue-500">
                          &quot;{testimonial.comment}&quot;
                        </blockquote>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Botones */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between px-2 sm:px-4 pointer-events-none z-20 hidden md:flex">
              <CarouselPrevious className="pointer-events-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 bg-blue-600 text-white hover:bg-blue-700 rounded-full shadow-lg transition-colors duration-200" />
              <CarouselNext className="pointer-events-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 bg-blue-600 text-white hover:bg-blue-700 rounded-full shadow-lg transition-colors duration-200" />
            </div>
          </Carousel>
        </div>
      </div>
      <Numeros />
    </section>
  );
}
