import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";

const Terms: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-[#1100FF] pt-40 pb-20 p-2">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-12 border border-[#1100FF]/20">
          <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold">
              Términos y Condiciones de Servicio
            </h1>
            <p className="mt-2 text-sm text-[#1100FF]/80">
              VeloxRent — Empresa de alquiler de autos, camionetas y vehículos
            </p>
          </header>

          <section className="space-y-6">
            <p>
              Estos Términos y Condiciones regulan el uso de los servicios y el
              acceso al sitio web de <strong>VeloxRent</strong>. Al utilizar
              nuestros servicios o realizar una reserva, aceptas cumplir con las
              condiciones establecidas a continuación.
            </p>

            <h2 className="text-2xl font-semibold">1. Objeto</h2>
            <p>
              VeloxRent ofrece el servicio de alquiler de autos, camionetas y
              otros vehículos para uso personal o comercial, bajo las
              condiciones de reserva, entrega y devolución especificadas por la
              empresa.
            </p>

            <h2 className="text-2xl font-semibold">2. Obligaciones del cliente</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proporcionar información veraz y completa al momento del registro o reserva.</li>
              <li>Presentar una licencia de conducir vigente y válida en el Perú.</li>
              <li>Usar el vehículo conforme a las leyes de tránsito y las políticas de la empresa.</li>
              <li>Devolver el vehículo en las condiciones acordadas y en el plazo establecido.</li>
              <li>Responsabilizarse por daños ocasionados por uso indebido o negligente del vehículo.</li>
            </ul>

            <h2 className="text-2xl font-semibold">3. Reservas y pagos</h2>
            <p>
              Las reservas se confirman tras el pago correspondiente, según las
              tarifas vigentes. VeloxRent se reserva el derecho de cancelar o
              modificar una reserva en caso de fuerza mayor o disponibilidad
              limitada de vehículos.
            </p>

            <h2 className="text-2xl font-semibold">4. Propiedad de los vehículos</h2>
            <p>
              Todos los vehículos son propiedad exclusiva de VeloxRent. El
              cliente adquiere únicamente un derecho temporal de uso bajo las
              condiciones acordadas en el contrato de alquiler.
            </p>

            <h2 className="text-2xl font-semibold">5. Responsabilidad</h2>
            <p>
              VeloxRent no será responsable por pérdidas, daños indirectos o
              personales derivados del uso del vehículo. La responsabilidad del
              cliente se limita a los daños ocasionados durante el periodo de
              alquiler según el contrato firmado.
            </p>

            <h2 className="text-2xl font-semibold">6. Ley aplicable</h2>
            <p>
              Estos términos se rigen por las leyes de la República del Perú. 
              Cualquier disputa será resuelta por los tribunales competentes del
              lugar donde se prestó el servicio.
            </p>

            <footer className="pt-8 text-sm text-[#1100FF]/60">
              Última actualización: {new Date().toLocaleDateString("es-PE")} · VeloxRent.
            </footer>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Terms;
