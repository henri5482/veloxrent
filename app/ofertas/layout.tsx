import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Planes y ofertas de alquiler de autos en Ayacucho ",
    template: "%s | Veloxrent"
  },
  description:
    "Descubre los planes de alquiler de autos, camionetas y motos en Ayacucho con Veloxrent. Ofertas para turismo, trabajo y viajes a lugares turísticos como Huamanga, Quinua y Wari. Reserva fácil y rápida.",

  keywords: [
    "planes de alquiler de autos Ayacucho",
    "ofertas alquiler de autos Ayacucho",
    "promociones alquiler camionetas Ayacucho",
    "alquiler de motos Ayacucho",
    "lugares turísticos Ayacucho auto",
    "rutas turísticas Ayacucho",
    "paquetes turismo Ayacucho",
    "autos para turismo Ayacucho",
    "Veloxrent planes y ofertas",
    "alquiler de vehículos 4x4 Ayacucho"
  ].join(", "),

  authors: [{ name: "Veloxrent" }],
  creator: "Veloxrent",
  publisher: "Veloxrent",

  openGraph: {
    title: "Planes y Ofertas | Veloxrent - Alquiler de Vehículos en Ayacucho",
    description:
      "Planes diarios, fines de semana y por semana para alquiler de autos, camionetas y motos en Ayacucho. Ofertas especiales para visitar los principales destinos turísticos de la región.",
    type: "website",
    url: "https://www.veloxrent.com.pe/planes-ofertas",
    images: [
      {
        url: "https://www.veloxrent.com.pe/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Planes y ofertas de alquiler de autos en Ayacucho - Veloxrent"
      }
    ],
    siteName: "Veloxrent",
    locale: "es_PE",
    emails: ["contacto@veloxrent.com.pe"],
    phoneNumbers: ["+51 901 643 094"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Planes y ofertas de alquiler de vehículos en Ayacucho | Veloxrent",
    description:
      "Conoce las promociones de alquiler de autos, camionetas y motos para turismo y trabajo en Ayacucho.",
    images: ["https://www.veloxrent.com.pe/og-image.jpg"],
    site: "@Veloxrent",
    creator: "@Veloxrent",
  },

  alternates: {
    canonical: "https://www.veloxrent.com.pe/planes-ofertas",
    languages: {
      'es-PE': 'https://www.veloxrent.com.pe/planes-ofertas',
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
  classification: 'Planes y ofertas de alquiler de autos, camionetas y motos en Ayacucho'
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

      {/* Schema principal para Veloxrent en página de planes/ofertas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RentalCarBusiness",
            "name": "Veloxrent",
            "description":
              "Planes y ofertas de alquiler de autos, camionetas y motos en Ayacucho. Vehículos modernos y seguros para visitar los principales atractivos turísticos de la región.",
            "url": "https://www.veloxrent.com.pe/planes-ofertas",
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
              "planes de alquiler de autos",
              "alquiler de camionetas",
              "alquiler de motos",
              "vehículos 4x4",
              "rutas turísticas en Ayacucho",
              "paquetes de turismo con auto"
            ]
          })
        }}
      />

      {/* Schema de planes de alquiler */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            "name": "Planes de alquiler de vehículos - Veloxrent",
            "itemListElement": [
              {
                "@type": "Offer",
                "name": "Plan Diario",
                "description": "Alquiler de auto o camioneta por 24 horas ideal para gestiones rápidas o viajes cortos en Ayacucho."
              },
              {
                "@type": "Offer",
                "name": "Plan Fin de Semana",
                "description": "Alquiler de vehículo de viernes a domingo para escapadas y visitas a lugares turísticos cercanos."
              },
              {
                "@type": "Offer",
                "name": "Plan Semana Completa",
                "description": "Alquiler de autos o camionetas por 7 días para proyectos de trabajo o turismo prolongado."
              },
              {
                "@type": "Offer",
                "name": "Plan Corporativo",
                "description": "Renta de vehículos para empresas con tarifas mensuales y soporte preferencial."
              }
            ]
          })
        }}
      />

      {/* Schema para lugares turísticos relacionados */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Lugares turísticos recomendados en Ayacucho",
            "description": "Principales atractivos turísticos de Ayacucho que puedes visitar con un vehículo de Veloxrent.",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Centro histórico de Huamanga"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Pampa de la Quinua"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Complejo arqueológico de Wari"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Aguas termales de Collpa"
              }
            ]
          })
        }}
      />
    </>
  );
}
