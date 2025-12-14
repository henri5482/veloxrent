// src/app/politica/page.tsx
import React from "react";
import Footer from "../footer";
import Navbar from "../navbar";

const Politica: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-[#1100FF] pt-40 pb-20 p-2">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-12 border border-[#1100FF]/20">
          <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold">
              Política de Privacidad
            </h1>
            <p className="mt-2 text-sm text-[#1100FF]/80">
              Veloxrent — Empresa de alquiler de autos y camionetas en Ayacucho
            </p>
          </header>

          <section className="space-y-6">
            <p>
              En <strong>Veloxrent</strong> valoramos la privacidad y seguridad
              de nuestros clientes y visitantes. Esta política describe cómo
              recopilamos, usamos y protegemos tu información personal al
              utilizar nuestros servicios de alquiler de vehículos en Ayacucho,
              Perú.
            </p>

            <h2 className="text-2xl font-semibold">1. Responsable del tratamiento</h2>
            <p>
              Responsable: <strong>Veloxrent</strong>. Para consultas sobre tus
              datos personales o el ejercicio de tus derechos, puedes escribir a{" "}
              <a
                href="mailto:Veloxrent.gestioncliente@gmail.com"
                className="underline hover:text-[#16385c]"
              >
                Veloxrent.gestioncliente@gmail.com
              </a>.
            </p>

            <h2 className="text-2xl font-semibold">2. Datos que recopilamos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Información de contacto: nombre, correo electrónico y teléfono.</li>
              <li>Datos de reserva: tipo de vehículo, fechas y lugar de entrega.</li>
              <li>
                Información de pago: método de pago, comprobantes o facturación.
              </li>
              <li>
                Datos técnicos: dirección IP, navegador, dispositivo y
                comportamiento en nuestro sitio web.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold">3. Finalidades del tratamiento</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gestionar las reservas y contratos de alquiler de vehículos.</li>
              <li>Atender consultas, cotizaciones y solicitudes de los clientes.</li>
              <li>
                Enviar información relevante sobre servicios, promociones o
                actualizaciones (previa autorización).
              </li>
              <li>Mejorar la experiencia del usuario y el rendimiento del sitio web.</li>
            </ul>

            <h2 className="text-2xl font-semibold">4. Conservación de los datos</h2>
            <p>
              Los datos personales se conservarán únicamente durante el tiempo
              necesario para cumplir con las finalidades mencionadas y de acuerdo
              con la normativa vigente en Perú.
            </p>

            <h2 className="text-2xl font-semibold">5. Derechos del titular</h2>
            <p>
              Tienes derecho a acceder, rectificar, actualizar o eliminar tus
              datos personales. Para ejercer estos derechos, comunícate a{" "}
              <a
                href="mailto:Veloxrent.gestioncliente@gmail.com"
                className="underline hover:text-[#16385c]"
              >
                Veloxrent.gestioncliente@gmail.com
              </a>{" "}
              o a través de nuestros canales de atención al cliente.
            </p>

            <h2 className="text-2xl font-semibold">6. Seguridad de la información</h2>
            <p>
              En <strong>Veloxrent</strong> aplicamos medidas técnicas y
              organizativas para proteger tu información frente a accesos no
              autorizados, pérdida o alteración. Todos los datos son tratados de
              forma confidencial y segura.
            </p>

            <h2 className="text-2xl font-semibold">7. Cambios en la política</h2>
            <p>
              Nos reservamos el derecho de modificar esta Política de Privacidad
              para adaptarla a cambios legales o de nuestros servicios. Te
              recomendamos revisarla periódicamente.
            </p>

            <footer className="pt-8 text-sm text-[#1100FF]/60">
              Última actualización: {new Date().toLocaleDateString("es-PE")} ·
              Veloxrent.
            </footer>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Politica;
