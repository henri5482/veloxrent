// components/floating-buttons.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaArrowRight, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { HiOutlineDotsVertical, HiOutlineMail } from "react-icons/hi";

// --- Types ---
interface SocialFloatingButtonProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  target?: string;
  bgColor: string;
  hoverBgColor: string;
  className?: string;
}

interface MoreOption {
  text: string;
  href: string;
  icon: React.ReactNode;
}

// --- Reusable Floating Button Component (for WhatsApp & Facebook) ---
const SocialFloatingButton: React.FC<SocialFloatingButtonProps> = ({
  icon,
  label,
  href,
  target = "_blank",
  bgColor,
  hoverBgColor,
  className,
}) => (
  <motion.a
    href={href}
    target={target}
    rel="noopener noreferrer"
    className={`relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg text-white text-xl transition-all duration-300 transform hover:scale-110 group ${bgColor} ${hoverBgColor} ${className}`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    aria-label={label}
  >
    {icon}
    {/* Tooltip for desktop */}
    <span className="absolute right-full mr-3 px-3 py-1 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden md:block">
      {label}
    </span>
  </motion.a>
);

// --- New Component for the "More Options" List Items ---
const MoreOptionItem: React.FC<MoreOption> = ({ text, href, icon }) => (
  <motion.a
    href={href}
    // CHANGED: Use max-w-full and a responsive width for mobile
    className="flex items-center justify-between w-[calc(100vw-8rem)] max-w-full md:w-72 p-4 bg-black text-white text-base rounded-md shadow-md transition-colors duration-200 hover:bg-[#E60012] group"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    layout
  >
    <span className="font-semibold">{text}</span>
    <motion.span
      className="text-red-500 group-hover:text-white transition-colors duration-200"
      initial={{ x: 0 }}
      whileHover={{ x: 5 }}
    >
      {icon}
    </motion.span>
  </motion.a>
);

// --- Main Floating Buttons Component ---
const FloatingButtons: React.FC = () => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const moreOptionsData: MoreOption[] = [
    { text: "Inicio", href: "/", icon: <FaArrowRight /> },
    { text: "Nosotros", href: "/nosotros", icon: <FaArrowRight /> },
    // { text: "Ofertas", href: "/servicios", icon: <FaArrowRight /> },
    { text: "Vehiculos", href: "/vehiculos", icon: <FaArrowRight /> },
    // { text: "Blog", href: "/blog", icon: <FaArrowRight /> },
    // { text: "Contacto", href: "/contacto", icon: <FaArrowRight /> },
    // { text: "Trabaja con nosotros", href: "/profesor", icon: <FaArrowRight /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <>
      {/* Desktop/Tablet Floating Buttons (Fixed right side) */}
      <div className="hidden md:flex fixed bottom-6 right-6 flex-col space-y-4 z-50">
        <SocialFloatingButton
          icon={<FaWhatsapp />}
          label="Necesitas Asesoría?"
          href="https://wa.me/51925285403?text=Quiero%20mayor%20información" // REMEMBER TO REPLACE!
          bgColor="bg-green-500"
          hoverBgColor="hover:bg-green-600"
        />
        <SocialFloatingButton
          icon={<FaFacebookF />}
          label="Facebook"
          href="https://www.facebook.com/profile.php?id=61572796175320" // REMEMBER TO REPLACE!
          bgColor="bg-blue-600"
          hoverBgColor="hover:bg-blue-700"
        />
        <SocialFloatingButton
          icon={<HiOutlineMail />}
          label="Correo"
          href="https://mail.google.com/mail/?view=cm&to=veloxrent.gestioncliente@gmail.com"
          bgColor="bg-red-500"
          hoverBgColor="hover:bg-red-600"
        />

        {/* "More Options" button for Desktop */}
        <motion.div
          className="relative"
          initial={false}
          animate={showMoreOptions ? "open" : "closed"}
        >
          <motion.button
            className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg text-white text-xl bg-gray-700 hover:bg-gray-800 transition-all duration-300 transform hover:scale-110"
            onClick={() => setShowMoreOptions(!showMoreOptions)}
            aria-label="Más opciones de contacto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <HiOutlineDotsVertical />
          </motion.button>
          <AnimatePresence>
            {showMoreOptions && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute bottom-full right-0 mb-4 flex flex-col space-y-2"
              >
                {moreOptionsData.map((option, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <MoreOptionItem {...option} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Mobile Floating Buttons (Fixed bottom bar) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-3 px-4 flex justify-around items-center shadow-lg z-50">
        <SocialFloatingButton
          icon={<FaWhatsapp />}
          label="WhatsApp"
          href="https://wa.me/51945513323?text=Quiero%20mayor%20información" // REMEMBER TO REPLACE!
          bgColor="bg-green-500"
          hoverBgColor="hover:bg-green-600"
          className="w-10 h-10 text-lg"
        />
        <SocialFloatingButton
          icon={<FaFacebookF />}
          label="Facebook"
          href="https://www.facebook.com/profile.php?id=61572796175320" // REMEMBER TO REPLACE!
          bgColor="bg-blue-600"
          hoverBgColor="hover:bg-blue-700"
          className="w-10 h-10 text-lg"
        />
        <SocialFloatingButton
          icon={<HiOutlineMail />}
          label="Correo"
          href="https://mail.google.com/mail/?view=cm&to=veloxrent.gestioncliente@gmail.com"
          bgColor="bg-red-500"
          hoverBgColor="hover:bg-red-600"
        />
        <motion.div
          className="relative flex items-center justify-center"
          initial={false}
          animate={showMoreOptions ? "open" : "closed"}
        >
          <motion.button
            className="flex items-center justify-center w-10 h-10 rounded-full shadow-lg text-white text-lg bg-gray-700 hover:bg-gray-800 transition-all duration-300"
            onClick={() => setShowMoreOptions(!showMoreOptions)}
            aria-label="Más opciones de contacto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <HiOutlineDotsVertical />
          </motion.button>
          <AnimatePresence>
            {showMoreOptions && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                // Adjusted width for mobile: takes full width minus some padding
                className="absolute bottom-full mb-3 flex flex-col space-y-2 left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-sm"
              >
                {moreOptionsData.map((option, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <MoreOptionItem {...option} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default FloatingButtons;
