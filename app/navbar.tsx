"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  Variants,
} from "framer-motion";

import { IconType } from "react-icons";
import { LuMapPin, LuMenu, LuX } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { MdOutgoingMail } from "react-icons/md";

// --- Data Configuration ---
interface NavLink {
  href: string;
  label: string;
}

interface SocialLink {
  href: string;
  label: string;
  Icon: IconType;
}

interface ContactInfoItemProps {
  text: string;
  href: string;
  Icon: IconType;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  // { href: "/servicios", label: "Ofertas y planes" },
  { href: "/vehiculos", label: "Vehiculos" },
  // { href: "/blog", label: "Blog" },
  // { href: "/contacto", label: "Contacto" },
];

const socialLinks: SocialLink[] = [
  {
    href: "https://www.facebook.com/profile.php?id=61572796175320",
    label: "Facebook",
    Icon: FaFacebook,
  },
  // {
  //   href: "https://facebook.com",
  //   label: "LinkedIn",
  //   Icon: FaLinkedin,
  // },
  {
    href: "https://www.youtube.com/@Veloxrent",
    label: "YouTube",
    Icon: FaYoutube,
  },
  {
    href: "https://www.instagram.com/velox__rent/",
    label: "Instagram",
    Icon: FaInstagram,
  },
  {
    href: "https://www.tiktok.com/@veloxrent",
    label: "TikTok",
    Icon: FaTiktok,
  },
];

const contactInfo: ContactInfoItemProps[] = [
  {
    text: "veloxrent.gestioncliente@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&to=veloxrent.gestioncliente@gmail.com",
    Icon: MdOutgoingMail,
  },
  {
    text: "925 285 403 ",
    href: "https://wa.me/51925285403 ?text=Quiero%20mayor%20información",
    Icon: FaWhatsapp,
  },
  {
    text: "NAZARENAS, Ayacucho 05001",
    href: "https://www.google.com/maps/place/VELOXRENT/@-13.1541862,-74.2196872,3a,75y,355.3h,91.24t/data=!3m7!1e1!3m5!1sT7sBAZXx_oJBLdSqIXFekQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-1.2367595648810124%26panoid%3DT7sBAZXx_oJBLdSqIXFekQ%26yaw%3D355.29997133111976!7i16384!8i8192!4m14!1m7!3m6!1s0x91127d78fc83a585:0xe003010eb14ed5d5!2sVELOXRENT!8m2!3d-13.154115!4d-74.2196947!16s%2Fg%2F11xsfvhzk6!3m5!1s0x91127d78fc83a585:0xe003010eb14ed5d5!8m2!3d-13.154115!4d-74.2196947!16s%2Fg%2F11xsfvhzk6?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D",
    Icon: LuMapPin,
  },
];

// --- Sub-Components ---
const ContactInfoItem = ({ text, href, Icon }: ContactInfoItemProps) => (
  <a
    href={href}
    className="flex items-center gap-2 text-xs text-white transition-opacity hover:opacity-80"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon className="h-4 w-4" />
    <span>{text}</span>
  </a>
);

const SocialLinks = ({ className = "text-white" }: { className?: string }) => (
  <div className="flex items-center gap-4 ">
    {socialLinks.map(({ href, label, Icon }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`transition-opacity hover:opacity-80 ${className}`}
      >
        <Icon className="h-5 w-5" />
      </a>
    ))}
  </div>
);

const TopBar = () => (
  <div className="hidden bg-[#1100FF] text-white md:block ">
    <div className="container  flex h-10 items-center justify-between px-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-6">
        {contactInfo.map((item) => (
          <ContactInfoItem key={item.text} {...item} />
        ))}
      </div>
      <SocialLinks />
    </div>
  </div>
);

const DesktopMenu = ({
  pathname,
  hoverVariants,
}: {
  pathname: string;
  hoverVariants: Variants;
}) => (
  <nav className="hidden items-center md:flex lg:flex">
    {navLinks.map((link) => (
      <motion.div
        key={link.href}
        initial="initial"
        whileHover="hover"
        variants={hoverVariants}
      >
        <Link
          href={link.href}
          className={`relative px-4 py-2 font-bold text-[#1100FF] transition-colors duration-300 ${
            pathname === link.href
              ? "font-bold text-[#1100FF]"
              : "hover:text-sky-950"
          }`}
        >
          {link.label}
          {pathname === link.href && (
            <motion.span
              layoutId="nav-underline"
              className="absolute bottom-0 left-0 h-0.5 w-full bg-[#1100FF]"
              transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
            />
          )}
        </Link>
      </motion.div>
    ))}
  </nav>
);

const MobileMenuButton = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) => (
  <motion.button
    className="z-[100] rounded-md p-2 text-[#1100FF] transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-[#373737] md:hidden"
    onClick={toggle}
    aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    whileTap={{ scale: 0.9 }}
  >
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={isOpen ? "x" : "menu"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? <LuX className="h-7 w-7" /> : <LuMenu className="h-7 w-7" />}
      </motion.div>
    </AnimatePresence>
  </motion.button>
);

// --- Main Navbar Component ---

const Navbar = () => {
  const pathname = usePathname() || "";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (mobileMenuOpen) return;
    const isAtTop = latest < 50;
    const isScrollingUp = latest < prevScrollY;
    setIsVisible(isAtTop || isScrollingUp);
    setPrevScrollY(latest);
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  // --- Framer Motion Variants ---
  const navbarVariants: Variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
    hidden: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const mobileMenuContainerVariants: Variants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
    closed: {
      x: "100%",
      transition: { duration: 0.3, ease: "easeInOut", when: "afterChildren" },
    },
  };

  const mobileMenuItemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  const linkHoverVariants: Variants = {
    hover: { scale: 1.05 },
    initial: { scale: 1 },
  };

  const overlayVariants: Variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50  bg-white shadow-sm backdrop-blur-md"
        variants={navbarVariants}
        animate={isVisible ? "visible" : "hidden"}
        initial="hidden"
      >
        <TopBar />
        <div className="  max-w-7xl container mx-auto flex h-20 items-center justify-between  md:h-28">
          <Link href="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image
                src="/logo.png"
                alt="Logo de Casagrande Geotecnia"
                width={100}
                height={48}
                className="h-11 w-auto md:h-13 max-md:px-2"
              />
            </motion.div>
          </Link>

          {/* Menú de escritorio en el centro */}
          <DesktopMenu pathname={pathname} hoverVariants={linkHoverVariants} />

          {/* Botones de acción en el escritorio */}
          <div className="hidden items-center space-x-4 md:flex lg:flex">
            <a
              href="https://wa.me/51962835652?text=Hola,%20quiero%20asesoría%20técnica"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-white border cursor-pointer border-[#1100FF] text-[#1100FF] font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#1100FF] hover:text-white"
              >
                ASESORÍA TÉCNICA
              </Button>
            </a>

            <a
              href="https://wa.me/51945513323?text=Hola,%20quiero%20una%20cotización"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-[#1100FF] cursor-pointer text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 border-2 ease-in-out hover:bg-white hover:text-[#1100FF] hover:border-[#1100FF] border-[#1100FF]"
              >
                ¡COTIZAR AHORA!
              </Button>
            </a>
          </div>

          {/* Botón para abrir el menú móvil */}
          <MobileMenuButton
            isOpen={mobileMenuOpen}
            toggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
      </motion.header>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              variants={mobileMenuContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 z-50 flex h-full w-4/5 max-w-sm flex-col bg-white shadow-xl"
            >
              <div className="flex items-center justify-between border-b p-4">
                <span className="font-bold text-[#1100FF]">Menú</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="rounded-md p-1 text-[#1100FF] transition-colors cursor-pointer hover:bg-gray-100 hover:text-[#373737]"
                >
                  <LuX className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex-grow space-y-2 overflow-y-auto p-4">
                {navLinks.map((link) => (
                  <motion.div key={link.href} variants={mobileMenuItemVariants}>
                    <Link
                      href={link.href}
                      className={`block rounded-lg px-4 py-3 text-base font-bold transition-colors ${
                        pathname === link.href
                          ? "bg-gray-300 text-black"
                          : "text-[#1100FF] hover:bg-gray-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="space-y-4 border-t p-4 pb-20 text-sm">
                {/* Botones de acción en el menú móvil */}
                <motion.div
                  variants={mobileMenuItemVariants}
                  className="w-full space-y-2 text-4xl"
                >
                  {/* Botón WhatsApp Asesoría Técnica */}
                  <a
                    href="https://wa.me/51962835652?text=Hola,%20quiero%20asesoría%20técnica"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      className="w-full bg-white border border-[#1100FF] text-[#1100FF] font-semibold rounded-lg transition duration-300 ease-in-out cursor-pointer hover:bg-[#1100FF] hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      ASESORÍA TÉCNICA
                    </Button>
                  </a>

                  {/* Botón WhatsApp Cotización */}
                  <a
                    href="https://wa.me/51945513323?text=Hola,%20quiero%20una%20cotización"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      className="w-full bg-[#1100FF] cursor-pointer text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#373737]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      ¡COTIZAR AHORA!
                    </Button>
                  </a>
                </motion.div>

                <div className="space-y-3">
                  {contactInfo.map((item) => (
                    <a
                      key={item.text}
                      href={item.href}
                      className="flex items-center gap-3 text-[#1100FF] transition-colors hover:text-red-600"
                    >
                      <item.Icon className="h-4 w-4 flex-shrink-0" />
                      <span>{item.text}</span>
                    </a>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <SocialLinks className="text-[#1100FF]" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
