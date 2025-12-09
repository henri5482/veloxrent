import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Veloxrent - empresa que alquilar autos, camionetas  en Ayacucho",
    template: ""
  },
  description:
    "Veloxrent ofrece alquiler de autos, camionetas y motos en Ayacucho. Vehículos modernos, seguros y listos para turismo, trabajo y uso corporativo. Reserva rápida y atención personalizada.",

  keywords: [
    "alquiler de autos en Ayacucho",
    "alquiler de camionetas Ayacucho",
    "alquiler de motos Ayacucho",
    "renta de vehículos Ayacucho",
    "autos para turismo Ayacucho",
    "alquiler de vehículos 4x4 Ayacucho",
    "renta de autos corporativos",
    "alquiler de autos baratos Ayacucho",
    "Veloxrent Ayacucho"
  ].join(", "),

  authors: [{ name: "Veloxrent" }],
  creator: "Veloxrent",
  publisher: "Veloxrent",

  openGraph: {
    title: "Veloxrent | Alquiler de Vehículos en Ayacucho",
    description:
      "Alquiler de autos, camionetas y motos en Ayacucho. Servicio confiable, vehículos modernos y atención inmediata. Reserva tu vehículo con Veloxrent.",
    type: "website",
    url: "https://www.veloxrent.com.pe",
    images: [
      {
        url: "https://www.veloxrent.com.pe/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Veloxrent - Alquiler de autos en Ayacucho"
      }
    ],
    siteName: "Veloxrent",
    locale: "es_PE",
    emails: ["contacto@veloxrent.com.pe"],
    phoneNumbers: ["+51 901 643 094"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Veloxrent - Alquiler de Vehículos en Ayacucho",
    description:
      "Autos, camionetas y motos para turismo, trabajo y uso diario. Alquiler rápido, seguro y accesible.",
    images: ["https://www.veloxrent.com.pe/og-image.jpg"],
    site: "@Veloxrent",
    creator: "@Veloxrent",
  },

  alternates: {
    canonical: "https://www.veloxrent.com.pe",
    languages: {
      'es-PE': 'https://www.veloxrent.com.pe',
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },

  category: 'vehicle-rental',
  classification: 'Empresa de alquiler de autos, camionetas y motos en Ayacucho'
};

export default function VeloxrentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <GoogleAnalytics gaId="G-YC6ZT9DXY6" />

      {/* Schema principal para Veloxrent */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RentalCarBusiness",
            "name": "Veloxrent",
            "description":
              "Empresa dedicada al alquiler de autos, camionetas y motos en Ayacucho. Vehículos modernos, seguros y disponibles para turismo, trabajo y uso corporativo.",
            "url": "https://www.veloxrent.com.pe",
            "logo": "https://www.veloxrent.com.pe/logo.png",
            "image": "https://www.veloxrent.com.pe/og-image.jpg",
            "telephone": "+51 901 643 094",
            "email": "contacto@veloxrent.com.pe",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Av. Ejemplo 123", // reemplazar
              "addressLocality": "Ayacucho",
              "addressRegion": "Ayacucho",
              "addressCountry": "PE"
            },
            "priceRange": "$$",
            "areaServed": "Ayacucho, Perú",
            "knowsAbout": [
              "alquiler de autos",
              "alquiler de camionetas",
              "alquiler de motos",
              "vehículos 4x4",
              "transporte turístico",
              "renta corporativa de vehículos"
            ]
          })
        }}
      />

      {/* Schema de servicios Veloxrent */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Servicios de Veloxrent",
            "description": "Lista de servicios de alquiler de vehículos ofrecidos por Veloxrent en Ayacucho.",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Alquiler de autos"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Alquiler de camionetas 4x4"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Alquiler de motos"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Renta corporativa mensual"
              },
              {
                "@type": "ListItem",
                "position": 5,
                "name": "Vehículos para turismo y viajes"
              }
            ]
          })
        }}
      />
    </>
  );
}
