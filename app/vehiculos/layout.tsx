import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Veloxrent - Alquiler de Vehículos en Ayacucho",
    template: ""
  },
  description:
    "Veloxrent ofrece alquiler de camionetas, autos y motos en Ayacucho. Vehículos modernos, seguros y listos para viajes, turismo y trabajo. Reserva fácil y rápida.",
  keywords: [
    "alquiler de vehículos en Ayacucho",
    "alquiler de autos Ayacucho",
    "renta de camionetas Ayacucho",
    "alquiler de motos Ayacucho",
    "servicio de transporte Ayacucho",
    "alquiler de vehículos para turismo Ayacucho",
    "renta de autos para empresas Ayacucho",
    "vehículos 4x4 alquiler Ayacucho",
    "alquiler de vehículos económicos Ayacucho",
    "Veloxrent Ayacucho"
  ].join(", "),
  authors: [{ name: "Veloxrent" }],
  creator: "Veloxrent",
  publisher: "Veloxrent",

  openGraph: {
    title: "Veloxrent - Alquiler de Vehículos en Ayacucho",
    description:
      "Servicio de alquiler de autos, camionetas y motos en Ayacucho. Vehículos modernos, seguros y disponibles para turismo, trabajo y viajes.",
    type: "website",
    url: "https://www.veloxrent.com.pe",
    images: [
      {
        url: "https://www.veloxrent.com.pe/og-veloxrent.jpg",
        width: 1200,
        height: 630,
        alt: "Alquiler de vehículos en Ayacucho - Veloxrent"
      },
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
      "Autos, camionetas y motos en alquiler en Ayacucho. Reserva rápida con Veloxrent.",
    images: ["https://www.veloxrent.com.pe/og-veloxrent.jpg"],
    site: "@Veloxrent",
    creator: "@Veloxrent"
  },

  alternates: {
    canonical: "https://www.veloxrent.com.pe",
    languages: {
      "es-PE": "https://www.veloxrent.com.pe"
    },
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  category: 'vehicle-rental',
  classification: 'Alquiler de Vehículos en Ayacucho - Veloxrent'
};

export default function NosotrosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <GoogleAnalytics gaId="G-HSYFNDRHDW" />

      {/* Schema Markup para Empresa de Alquiler de Vehículos */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RentalCarBusiness",
            "name": "Veloxrent",
            "description":
              "Empresa de alquiler de vehículos en Ayacucho: autos, camionetas y motos para turismo, trabajo y transporte corporativo.",
            "url": "https://www.veloxrent.com.pe",
            "logo": "https://www.veloxrent.com.pe/logo.png",
            "image": "https://www.veloxrent.com.pe/og-veloxrent.jpg",
            "telephone": "+51 901 643 094",
            "email": "contacto@veloxrent.com.pe",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Av. Ejemplo 123",
              "addressLocality": "Ayacucho",
              "addressRegion": "Ayacucho",
              "addressCountry": "Perú"
            },
            "priceRange": "$$",
            "areaServed": "Ayacucho, Perú",
            "foundingDate": "2022",
            "knowsAbout": [
              "alquiler de autos",
              "alquiler de camionetas",
              "alquiler de motos",
              "vehículos 4x4",
              "renta de autos para viajes",
              "transporte turístico"
            ]
          })
        }}
      />

      {/* Schema de lista de servicios */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Servicios de Veloxrent",
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
                "name": "Vehículos para turismo"
              }
            ]
          })
        }}
      />
    </>
  );
}
