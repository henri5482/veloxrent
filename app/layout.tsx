import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import FloatingButtons from "./floating-buttons";
import "./globals.css";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

// Datos de la empresa para reutilizar
const companyInfo = {
  name: "Casagrande Geotecnia",
  description:
  "Consultora en ingeniería civil y geotecnia. Estudios geotécnicos, geología y laboratorio de suelos con certificaciones ISO 9001, 14001 y 37001.",
  url: "https://www.casagrandegeotecnia.com.pe/",
  logo: "https://www.casagrandegeotecnia.com.pe/logo.png",
  phone: "+51 962 835 652", // Reemplaza con tu teléfono real
  email: "comercial@casagrandegeotecnia.com.pe", // Reemplaza con tu email real
  address: {
    street: "Jirón Quinua 570, Ayacucho 05003", // Reemplaza con tu dirección real
    city: "Lima",
    region: "Lima",
    country: "Perú",
  },
  socialMedia: {
    linkedin:
      "https://www.linkedin.com/company/casagrande-geotecnia-y-concreto/",
    facebook:
      "https://www.facebook.com/profile.php?id=100077864046528&locale=es_LA",
    instagram: "https://www.instagram.com/casagrandegeotecnia/",
    youtube: "https://www.youtube.com/@CasagrandeGeotecnia-s5m",
    tiktok: "https://www.tiktok.com/@casagrandegeotecnia",
  },
};

// Schema structured data para mejor SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EngineeringFirm",
  name: companyInfo.name,
  description: companyInfo.description,
  url: companyInfo.url,
  logo: companyInfo.logo,
  telephone: companyInfo.phone,
  email: companyInfo.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: companyInfo.address.street,
    addressLocality: companyInfo.address.city,
    addressRegion: companyInfo.address.region,
    addressCountry: companyInfo.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    // Agrega coordenadas si las tienes
  },
  sameAs: [
    companyInfo.socialMedia.linkedin,
    companyInfo.socialMedia.facebook,
    companyInfo.socialMedia.instagram,
    companyInfo.socialMedia.youtube,
    companyInfo.socialMedia.tiktok,
  ],
  serviceType: [
    "Geotechnical Engineering",
    "Civil Engineering Consulting",
    "Soil Testing Laboratory",
    "Geological Surveys",
    "Construction Quality Control",
  ],
  areaServed: "Perú",
  hasCertification: [
    {
      "@type": "Certification",
      name: "ISO 9001:2015 - Quality Management Systems",
    },
    {
      "@type": "Certification",
      name: "ISO 14001:2015 - Environmental Management Systems",
    },
    {
      "@type": "Certification",
      name: "ISO 37001:2016 - Anti-bribery Management Systems",
    },
  ],
  foundingDate: "2005", // Reemplaza con año real de fundación
  founder: {
    "@type": "Person",
    name: "Fundador Casagrande", // Reemplaza con nombre real
  },
};

export const metadata: Metadata = {
  title: {
    default:
      "Casagrande Geotecnia | Consultores en Ingeniería y Geotecnia en Perú",
    template: "%s | Casagrande Geotecnia",
  },
  description: companyInfo.description,
  keywords: [
   // Servicios principales + Perú
    "estudios geotécnicos Perú",
    "geotecnia Perú",
    "laboratorio de suelos Perú",
    "estudios de cimentación Perú",
    "control calidad construcción Perú",
    "mecánica de suelos Perú",
    
    // Ciudades principales (las más importantes)
    "estudios geotécnicos Lima",
    "geotecnia Lima",
    "laboratorio suelos Lima",
    "estudios geotécnicos Arequipa",
    "geotecnia Arequipa",
    "estudios geotécnicos Cusco",
    "geotecnia Cusco",
    "estudios geotécnicos Trujillo",
    "geotecnia Trujillo",
    "estudios geotécnicos Chiclayo",
    "estudios geotécnicos Piura",
    "geotecnia Ayacucho",
    "estudios suelos Ayacucho",
    "estudios geotécnicos Huancayo",
    "estudios geotécnicos Iquitos",
    "estudios geotécnicos Tacna",
    "estudios geotécnicos Puno",
    
    // Regiones geográficas
    "estudios geotécnicos costa Perú",
    "geotecnia sierra Perú",
    "estudios suelos selva peruana",
    
    // Servicios específicos
    "estabilidad taludes Perú",
    "estudios geofísicos Perú",
    "análisis suelos construcción",
    "mecánica rocas Perú",
    "hidrogeología Perú",
    "ensayos concreto Perú",
    "estudios pavimentos Perú",
    
    // Sectores
    "geotecnia minería Perú",
    "estudios geotécnicos carreteras",
    "geotecnia edificaciones",
    "estudios suelos puentes",
    
    // Certificaciones
    "consultora ISO 9001 Perú",
    "ingeniería civil certificada Perú",
    
    // Long-tail keywords
    "estudio de suelos para edificios Lima",
    "laboratorio mecánica suelos Arequipa",
    "consultoría geotécnica proyectos construcción",
    "ensayos laboratorio suelos certificados",
  ].join(", "),

  // Metadatos básicos
  authors: [{ name: "Casagrande Geotecnia" }],
  creator: "Casagrande Geotecnia",
  publisher: "Casagrande Geotecnia",
  category: "engineering",
  classification: "Consultoría en Ingeniería Civil y Geotecnia",

  // Robots y indexación
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
      noimageindex: false,
    },
  },

  // Verificación de propiedad (opcional)
  verification: {
    google: "tu-codigo-de-verificacion-google", // Reemplaza con tu código
    // yandex: 'tu-codigo-yandex',
    // bing: 'tu-codigo-bing'
  },

  // Íconos y favicon
 icons: {
  icon: [
    { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
  ],
  shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
  apple: [
    { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  ],
  other: [
    {
      rel: "mask-icon",
      url: "/safari-pinned-tab.svg",
      color: "#5bbad5",
    },
  ],
},
manifest: "/site.webmanifest",


  // Open Graph para redes sociales
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: companyInfo.url,
    siteName: companyInfo.name,
    title:
      "Casagrande Geotecnia | Consultores en Ingeniería Civil y Estudios Geotécnicos",
    description: companyInfo.description,
    emails: [companyInfo.email],
    phoneNumbers: [companyInfo.phone],
    images: [
      {
        url: "/fondo.webp",
        width: 1200,
        height: 630,
        alt: "Casagrande Geotecnia - Consultoría en Ingeniería Civil y estudios Geotécnicos",
        type: "image/jpeg",
      },
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Casagrande Geotecnia - Logo",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Casagrande Geotecnia | Consultores Especializados",
    description:
      "Estudios geotécnicos, laboratorio de suelos y control de calidad para proyectos de construcción.",
    creator: "@CasagrandeGeo",
    site: "@CasagrandeGeo",
    images: ["/twitter-image.jpg"],
  },

  // Alternates y canonical
  alternates: {
    canonical: companyInfo.url,
    languages: {
      "es-PE": companyInfo.url,
    },
  },

  // Metadatos adicionales
  metadataBase: new URL(companyInfo.url),

  // Format detection
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  // Apple specific
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: companyInfo.name,
  },

  // Viewport (se maneja automáticamente en Next.js 15)
};

// Componente para Structured Data
function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-PE" suppressHydrationWarning className={font.variable}>
      <head>
        <StructuredData />
        {/* Preconnects para mejor performance */}
        <link rel="preconnect" href="https://www.google-analytics.com" />      
      </head>
      <body className={`${font.className} antialiased`}>
        {children}
        <FloatingButtons />

      </body>
    </html>
  );
}
