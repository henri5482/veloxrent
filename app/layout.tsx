import { GoogleAnalytics } from "@next/third-parties/google";
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

// ✅ Datos de la empresa
const companyInfo = {
  name: "VeloxRent",
  description:
    "VeloxRent es una empresa de alquiler de autos y camionetas en Ayacucho, Perú. Ofrecemos vehículos modernos, seguros y al mejor precio para viajes, turismo y trabajo. Reserva fácilmente y disfruta del mejor servicio de renta de autos en Ayacucho.",
  url: "https://www.veloxrentperu.com",
  logo: "https://www.veloxrentperu.com/logo.png",
  phone: "+51925285403",
  email: "veloxrent.gestioncliente@gmail.com",
  address: {
    street: "NAZARENAS",
    city: "Ayacucho",
    region: "Ayacucho",
    postalCode: "05001",
    country: "PE",
  },
  coordinates: {
    latitude: -13.154121,
    longitude: -74.219652,
  },
  socialMedia: {
    facebook: "https://www.facebook.com/profile.php?id=61572796175320",
    instagram: "https://www.instagram.com/velox__rent/",
    whatsapp: "https://wa.me/51925285403",
  },
};

// ✅ Schema.org - Datos estructurados optimizados
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  "@id": `${companyInfo.url}#organization`,
  name: companyInfo.name,
  alternateName: "Velox Rent Ayacucho",
  description: companyInfo.description,
  url: companyInfo.url,
  logo: {
    "@type": "ImageObject",
    url: companyInfo.logo,
    width: "512",
    height: "512",
  },
  image: [companyInfo.logo, `${companyInfo.url}/og-image.jpg`],
  telephone: companyInfo.phone,
  email: companyInfo.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: companyInfo.address.street,
    addressLocality: companyInfo.address.city,
    addressRegion: companyInfo.address.region,
    postalCode: companyInfo.address.postalCode,
    addressCountry: companyInfo.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: companyInfo.coordinates.latitude,
    longitude: companyInfo.coordinates.longitude,
  },
  sameAs: Object.values(companyInfo.socialMedia),
  areaServed: [
    { "@type": "City", name: "Ayacucho" },
    { "@type": "City", name: "Huamanga" },
    { "@type": "Country", name: "Perú" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Alquiler de Vehículos VeloxRent",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Alquiler de Autos",
          description:
            "Autos compactos, sedanes y automáticos para alquiler diario o semanal. Ideal para viajes familiares o trabajo en la ciudad.",
          provider: { "@type": "Organization", name: companyInfo.name },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Alquiler de Camionetas",
          description:
            "Camionetas 4x4 y SUV para viajes largos, turismo y trabajo. Disponibles con GPS, aire acondicionado y seguro incluido.",
          provider: { "@type": "Organization", name: companyInfo.name },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Alquiler por Días o Semanas",
          description:
            "Planes flexibles para que elijas la duración del alquiler según tus necesidades, con precios competitivos en Ayacucho.",
          provider: { "@type": "Organization", name: companyInfo.name },
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "120",
    bestRating: "5",
    worstRating: "1",
  },
  foundingDate: "2022",
  knowsAbout: [
    "Alquiler de autos en Ayacucho",
    "Renta de camionetas Ayacucho",
    "Autos para turismo Ayacucho",
    "VeloxRent",
    "Autos de alquiler Perú",
  ],
};

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: {
    default:
      "VeloxRent | Alquiler de Autos y Camionetas  Ayacucho",
    template: "%s | VeloxRent",
  },
  description: companyInfo.description,
  authors: [{ name: "VeloxRent" }],
  creator: "VeloxRent",
  publisher: "VeloxRent",
  category: "Alquiler de Vehículos",
  classification: "Renta de autos y camionetas en Ayacucho",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "G-HSYFNDRHDW",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "es_PE",
    url: companyInfo.url,
    siteName: companyInfo.name,
    title:
      "VeloxRent | Alquiler de Autos y Camionetas en Ayacucho - Perú",
    description: companyInfo.description,
    emails: [companyInfo.email],
    phoneNumbers: [companyInfo.phone],
    images: [
      {
        url: `${companyInfo.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "VeloxRent - Alquiler de Autos y Camionetas en Ayacucho",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "VeloxRent | Renta de Autos y Camionetas en Ayacucho",
    description:
      "Encuentra el vehículo ideal con VeloxRent. Autos y camionetas modernas, seguras y con precios accesibles en Ayacucho, Perú.",
    images: [`${companyInfo.url}/og-image.jpg`],
    creator: "@VeloxRent",
    site: "@VeloxRent",
  },

  alternates: {
    canonical: companyInfo.url,
    languages: { "es-PE": companyInfo.url },
  },

  metadataBase: new URL(companyInfo.url),

  formatDetection: { telephone: true, email: true, address: true },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VeloxRent",
  },

  other: {
    "msapplication-TileColor": "#2d89ef",
    "theme-color": "#ffffff",
  },
};

// ✅ Componente de datos estructurados
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
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={`${font.className} antialiased`}>
        {children}
        <FloatingButtons />
        <GoogleAnalytics gaId="G-HSYFNDRHDW" />
      </body>
    </html>
  );
}
