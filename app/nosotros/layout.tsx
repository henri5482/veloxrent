import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Veloxrent - Nosotros",
    template: "%s | Casagrande Geotecnia"
  },
  description: "Conoce nuestro equipo de ingenieros especializados, valores corporativos y certificaciones ISO. Más de 20 años de experiencia en estudios geotécnicos y consultoría en ingeniería civil.",
  keywords: [
    "equipo Casagrande Geotecnia",
    "ingenieros geotécnicos Perú",
    "consultoría ingeniería civil Lima",
    "expertos en estudios de suelos",
    "valores corporativos construcción",
    "certificaciones ISO ingeniería",
    "experiencia en geotecnia",
    "equipo técnico especializado",
    "historia Casagrande Geotecnia",
    "misión y visión empresa geotécnica",
    "profesionales ingeniería civil",
    "consultores geotécnicos calificados",
    "trayectoria en proyectos civiles",
    "equipo multidisciplinario geotecnia",
    "valores éticos construcción",
    "compromiso calidad ingeniería"
  ].join(", "),
  authors: [{ name: "Casagrande Geotecnia" }],
  creator: "Casagrande Geotecnia",
  publisher: "Casagrande Geotecnia",
  openGraph: {
    title: "Nosotros | Casagrande Geotecnia - Equipo y Valores",
    description: "Conoce a nuestro equipo de ingenieros especializados, nuestra trayectoria y compromiso con la excelencia en estudios geotécnicos.",
    type: "website",
    url: "https://www.casagrandegeotecnia.com.pe/nosotros",
    images: [
      {
        url: "https://www.casagrandegeotecnia.com.pe/fondo.webp",
        width: 1200,
        height: 630,
        alt: "Equipo de Ingenieros - Casagrande Geotecnia",
      },
    ],
    siteName: "Casagrande Geotecnia",
    locale: "es_PE",
    emails: ["info@casagrandegeotecnia.com.pe"],
    phoneNumbers: ["+51 123 456 789"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros | Casagrande Geotecnia - Equipo Especializado",
    description: "Equipo de ingenieros geotécnicos con amplia experiencia en proyectos de construcción e infraestructura.",
    images: ["https://www.casagrandegeotecnia.com.pe/equipo-twitter.jpg"],
    site: "@CasagrandeGeo",
    creator: "@CasagrandeGeo",
  },
  alternates: {
    canonical: "https://www.casagrandegeotecnia.com.pe/nosotros",
    languages: {
      'es-PE': 'https://www.casagrandegeotecnia.com.pe/nosotros',
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
  category: 'engineering',
  classification: 'Consultoría en Ingeniería Geotécnica - Sobre Nosotros'
};

export default function NosotrosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <GoogleAnalytics gaId="G-HSYFNDRHDW" />
      
      {/* Schema Markup para Página Nosotros */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "Nosotros - Casagrande Geotecnia",
            "description": "Información sobre nuestro equipo, valores y trayectoria en ingeniería geotécnica",
            "url": "https://www.casagrandegeotecnia.com.pe/nosotros",
            "mainEntity": {
              "@type": "Organization",
              "name": "Casagrande Geotecnia",
              "description": "Consultora especializada en estudios geotécnicos, geología, laboratorio de suelos y control de calidad para construcción",
              "foundingDate": "2013", // Reemplaza con año real
              "founder": {
                "@type": "Person",
                "name": "Ing. Carlos Casagrande" // Reemplaza con nombre real
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Tu Dirección 123",
                "addressLocality": "Lima",
                "addressRegion": "Lima",
                "addressCountry": "Perú"
              },
              "telephone": "+51 123 456 789",
              "email": "info@casagrandegeotecnia.com.pe",
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "value": "25" // Reemplaza con número real
              },
              "knowsAbout": [
                "Geotecnia",
                "Ingeniería Civil",
                "Estudios de Suelos",
                "Geología Aplicada",
                "Mecánica de Rocas",
                "Hidrogeología",
                "Control de Calidad en Construcción",
                "Estudios Geofísicos"
              ],
              "memberOf": [
                {
                  "@type": "Organization",
                  "name": "Colegio de Ingenieros del Perú"
                }
              ],
              "award": [
                "Certificación ISO 9001:2015",
                "Certificación ISO 14001:2015", 
                "Certificación ISO 37001:2016"
              ],
              "mission": "Proveer servicios de consultoría geotécnica de excelencia, garantizando la seguridad y calidad en proyectos de construcción mediante estudios técnicos confiables y soluciones innovadoras.",
              "slogan": "Expertos en cimentar tu confianza"
            }
          })
        }}
      />

      {/* Schema para valores corporativos */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList", 
            "name": "Valores Corporativos - Casagrande Geotecnia",
            "description": "Principios que guían nuestro trabajo en consultoría geotécnica",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Excelencia Técnica"
              },
              {
                "@type": "ListItem",
                "position": 2, 
                "name": "Compromiso con la Seguridad"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Innovación en Soluciones"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Responsabilidad Ambiental"
              },
              {
                "@type": "ListItem",
                "position": 5,
                "name": "Transparencia y Ética"
              }
            ]
          })
        }}
      />
    </>
  );
}