/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaChevronUp } from "react-icons/fa";
import {
  PiFacebookLogo,
  PiInstagramLogo,
  PiTiktokLogo,
  PiYoutubeLogo,
} from "react-icons/pi";

/** Construye el enlace de WhatsApp para el número dado (auto-agrega +51 si falta) */
const waLink = (num: string, msg?: string) => {
  const digits = num.replace(/\D/g, "");
  const withCc = digits.startsWith("51") ? digits : `51${digits}`;
  const text = encodeURIComponent(
    msg ??
    "Hola, me gustaría hacer una consulta. ¿Podrían brindarme más información?"
  );
  return `https://wa.me/${withCc}?text=${text}`;
};

const Footer = () => {
  // Secciones con números → irán a WhatsApp
  const connectLinks = [
    {
      title: "Atención al cliente",
      links: [
        { name: "925285403", phone: "925285403" },
        { name: "949134075", phone: "949134075" },
        { name: "997187495", phone: "997187495" },
        { name: "901643094", phone: "901643094" },
        // correo agregado
        { name: "veloxrent.gestioncliente@gmail.com", email: "veloxrent.gestioncliente@gmail.com" },
      ],
      message:
        "Hola, necesito soporte como cliente de Veloxrent. ¿Me pueden ayudar?",
    },
    // (Venta de vehículos pasó a 'Secciones' como pediste)
  ];

  // Secciones del sitio + extras pedidos
  const productLinks = [
    {
      name: "Mapa",
      href:
        "/https://www.google.com/maps/place/VELOXRENT/@-13.1541862,-74.2196872,3a,75y,355.3h,91.24t/data=!3m7!1e1!3m5!1sT7sBAZXx_oJBLdSqIXFekQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-1.2367595648810124%26panoid%3DT7sBAZXx_oJBLdSqIXFekQ%26yaw%3D355.29997133111976!7i16384!8i8192!4m14!1m7!3m6!1s0x91127d78fc83a585:0xe003010eb14ed5d5!2sVELOXRENT!8m2!3d-13.154115!4d-74.2196947!16s%2Fg%2F11xsfvhzk6!3m5!1s0x91127d78fc83a585:0xe003010eb14ed5d5!8m2!3d-13.154115!4d-74.2196947!16s%2Fg%2F11xsfvhzk6?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D",
    },
    { name: "Vehiculos", href: "/vehiculos" },
    {
      name: "Trabaja con nosotros",
      href: "https://api.whatsapp.com/send/?phone=51901643094&text=Hola%2C+me+gustar%C3%ADa+postular+a+Veloxrent.+Adjunto+mis+datos+y+CV.&type=phone_number&app_absent=0",
      target: "_blank"
    },

    {
      name: "Venta de vehículos",
      href: waLink("925285403", "Hola, estoy interesado en la venta de vehículos de Veloxrent. ¿Me pueden brindar información?"),
      external: true,
    },
  ];

  const socialLinks = [
    {
      icon: PiFacebookLogo,
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61572796175320",
    },
    {
      icon: PiInstagramLogo,
      name: "Instagram",
      href: "https://www.instagram.com/velox__rent/",
    },
    { icon: PiTiktokLogo, name: "TikTok", href: "https://www.tiktok.com/@veloxrent" },
    { icon: PiYoutubeLogo, name: "YouTube", href: "https://www.youtube.com/@Veloxrent" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1100FF] border-t max-md:pb-20 border-white text-white ">
      <div className="max-w-7xl container mx-auto px-4 py-8">
        {/* Top */}
        <div className="hidden md:flex justify-between items-center">
          <Link
            href="/"
            className="flex items-start group relative h-12 w-48 md:h-16 md:w-64 lg:w-80 xl:w-60"
          >
            <motion.div
              className="relative h-full w-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <Image
                src="/logofooter.png"
                alt="Logo de casagrande geotecnia"
                fill
                sizes="(max-width: 768px) 192px, (max-width: 1200px) 256px, 384px"
                className="object-contain object-left transition-transform group-hover:scale-105"
                priority
              />
            </motion.div>
          </Link>
          <button
            onClick={scrollToTop}
            className="flex items-center text-sm font-medium text-white hover:text-red-600 transition-colors group cursor-pointer"
            aria-label="Volver arriba"
          >
            Volver arriba
            <FaChevronUp className="ml-2 w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Logo */}
        <div className="flex flex-col items-center mb-6 md:hidden">
          <div className="flex items-center justify-center w-full max-w-xs">
            <Link
              href="/"
              className="flex items-center group relative h-16 md:h-12 w-full"
            >
              <motion.div
                className="relative h-full w-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                <Image
                  src="/logofooter.png"
                  alt="logo de casagrande geotecnia"
                  fill
                  sizes="100vw"
                  className="object-contain px-2 transition-transform group-hover:scale-105"
                  priority
                />
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-y-10 lg:gap-x-12 mb-8 sm:mb-12">
          <div className="py-8 flex flex-col md:items-start items-center">
            <h2 className="text-sm font-semibold mb-6 text-white text-center">
              Aviso legal
            </h2>
            <a href="/libro">
              <h2 className="text-sm hover:text-red-600 font-semibold mb-6 text-white text-center">
                Libro de reclamaciones
              </h2>
            </a>
            <h2 className="text-sm font-semibold mb-6 text-white text-center">
              Veloxrent RUC:1073092393939
            </h2>
          </div>

          {/* Contacto (WhatsApp + correo) */}
          <div className="py-2">
            <nav className="space-y-4 sm:space-y-6">
              {connectLinks.map((section) => (
                <div key={section.title}>
                  <h3 className="font-medium mb-2 sm:mb-3 text-white text-base">
                    {section.title}
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {section.links.map((link) => (
                      <li key={`${section.title}-${link.name}`}>
                        {"phone" in link ? (
                          <a
                            href={waLink(link.phone as string, section.message)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-red-600 hover:underline transition-colors flex items-center text-sm group"
                          >
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mr-2 flex-shrink-0 group-hover:bg-red-600 transition-colors"></span>
                            {link.name}

                          </a>
                        ) : (
                          <a
                            href={`mailto:${(link as any).email}`}
                            className="text-white hover:text-red-200 hover:underline transition-colors flex items-center text-sm group"
                          >
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mr-2 flex-shrink-0 group-hover:bg-red-200 transition-colors"></span>
                            {(link as any).name}

                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Secciones */}
          <div className="py-2">
            <h2 className="text-lg font-bold mb-4 text-white">Secciones</h2>
            <nav>
              <ul className="space-y-2 sm:space-y-3">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white hover:text-red-600 hover:underline transition-colors flex items-center text-sm group"
                      target={link.external || link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.external || link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mr-2 flex-shrink-0 group-hover:bg-red-500 transition-colors"></span>
                      {link.name}

                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* About + Social (desktop) */}
          <div className="hidden md:flex flex-col items-start py-2">
            <p className="text-white mb-4 sm:mb-6 text-sm leading-relaxed">
              Pioneros alquilando vehículos sin conductor en Ayacucho
              ¡Más libertad en 4 ruedas!            </p>
            <div className="flex gap-3 mt-auto">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-white hover:text-red-600 transition-colors p-2 rounded-full hover:scale-110 transform"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={22} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Social mobile */}
        <div className="md:hidden flex justify-center gap-4 mb-6 sm:mb-8">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              className="text-white hover:text-[#0d70af] transition-colors p-2 sm:p-3 rounded-full hover:scale-110 transform "
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <social.icon size={24} className="w-6 h-6" />
            </Link>
          ))}
        </div>

        <Separator className="my-4 sm:my-6 bg-white" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-2 sm:pt-4">
          <div className="text-white text-xs sm:text-sm mb-3 md:mb-0 text-center md:text-left leading-relaxed">
            © {new Date().getFullYear()} Grupo Veloxrent. Todos los derechos
            reservados.
          </div>
          <nav className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 gap-y-1 sm:gap-y-2 items-center">
            <Link
              href="/terminos"
              className="text-white hover:text-[#0a5c8a] text-xs sm:text-sm whitespace-nowrap"
            >
              Términos de servicio
            </Link>
            <span className="hidden sm:inline text-gray-400">|</span>
            <Link
              href="/politica"
              className="text-white hover:text-[#0a5c8a] text-xs sm:text-sm whitespace-nowrap"
            >
              Política de privacidad
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
