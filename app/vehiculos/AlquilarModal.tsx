// components/AlquilerModal.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface AlquilerModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehiculo: {
    marca: string;
    modelo: string;
    precio: number;
    slug: string;
    imagen: string;
    tipo?: string;
    año?: number;
  };
}

export default function AlquilerModal({ isOpen, onClose, vehiculo }: AlquilerModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    numero: "",
    dni: "",
    mensaje: "",
    vehiculo: `${vehiculo.marca} ${vehiculo.modelo}`,
    precio: vehiculo.precio,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "dni") {
      if (/^\d{0,8}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "numero") {
      if (/^\d{0,9}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      setError("Debes aceptar los términos y condiciones para continuar");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/alquiler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || "Error al enviar el formulario");
      }

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({
          nombre: "",
          email: "",
          numero: "",
          dni: "",
          mensaje: "",
          vehiculo: `${vehiculo.marca} ${vehiculo.modelo}`,
          precio: vehiculo.precio,
        });
        setAgreed(false);
      }, 3000);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      const errorMessage = error instanceof Error ? error.message : "Error desconocido al enviar el formulario";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay oscuro mejorado */}
          <motion.div
            className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal principal - Diseño más ordenado */}
          <motion.div
            className="relative bg-slate-800 rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-slate-700"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header elegante */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm px-8 py-6 flex justify-between items-center z-20 border-b border-slate-700">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Alquilar {vehiculo.marca} {vehiculo.modelo}
                </h2>
                <p className="text-slate-300 text-sm">
                  Complete el formulario para proceder con la reserva
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors duration-200"
                disabled={isSubmitting}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido con scroll */}
            <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
              <div className="p-8">
                {/* Estado de éxito */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-emerald-900/20 to-green-900/20 border border-emerald-700/30 rounded-xl p-8 text-center backdrop-blur-sm"
                  >
                    <div className="w-16 h-16 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-700/30">
                      <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      ¡Solicitud Enviada con Éxito!
                    </h3>
                    <p className="text-slate-300 max-w-md mx-auto">
                      Tu solicitud de alquiler ha sido enviada correctamente.
                      Nos pondremos en contacto contigo en las próximas 24 horas.
                    </p>
                  </motion.div>
                )}

                {!isSubmitted && (
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Sección izquierda - Imagen del vehículo */}
                    <div className="xl:col-span-1">
                      <div className="sticky top-4 space-y-6">
                        {/* Imagen del vehículo */}
                        <div className="bg-slate-700/50 rounded-xl overflow-hidden border border-slate-600 backdrop-blur-sm">
                          <div className="aspect-[4/3] relative">
                            <Image
                              src={vehiculo.imagen}
                              alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                              fill
                              className="object-cover"
                              priority
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-xl font-bold text-white mb-2">
                              {vehiculo.marca} {vehiculo.modelo}
                            </h3>
                            <div className="flex items-center justify-between">
                              <div className="text-slate-300 text-sm">
                                {vehiculo.tipo} • {vehiculo.año}
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-blue-400">
                                  S/ {vehiculo.precio.toFixed(2)}
                                </div>
                                <div className="text-sm text-slate-400">por día</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Información rápida */}
                        <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50 backdrop-blur-sm">
                          <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
                            Contrato
                          </h4>
                          <div className="space-y-2 text-slate-300 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                              <span>Vehículo limpio</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                              <span>Inspección vehicular </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                              <span>Tanque con combustible</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                              <span>SOAT</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                              <span>Asistencia en carretera 24/7</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sección central - Políticas y requisitos */}
                    <div className="xl:col-span-1 space-y-6">
                      {/* Encabezado */}
                      <div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                          Políticas de Alquiler
                        </h1>
                        <p className="text-slate-400">
                          Revise nuestros términos antes de continuar
                        </p>
                      </div>

                      {/* Términos y condiciones */}
                     <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50 backdrop-blur-sm">
    <h3 className="text-lg font-semibold text-white mb-4">
        Políticas de Velox Rent
    </h3>
    <div className="max-h-60 overflow-y-auto space-y-4 text-slate-300 text-sm leading-relaxed">
        {/* 1-REQUISITOS DE ALQUILER */}
        <div>
            <p className="font-semibold text-white">1- REQUISITOS DE ALQUILER</p>
            <p>El cliente debe presentar copia de su DNI, licencia de conducir válida (mínimo 02 años de antigüedad) y un recibo reciente de agua o luz para validar su domicilio. Se requiere una garantía de S/ 500.00 o S/ 800.00 dependiendo del tipo de vehículo elegido que será reembolsable al finalizar el alquiler si el vehículo se entrega en las mismas condiciones.</p>
        </div>

        {/* 2- PROCESO DE RESERVA */}
        <div>
            <p className="font-semibold text-white">2- PROCESO DE RESERVA</p>
            <p>La reserva se confirma únicamente con el depósito de la garantía (de S/ 500.00 o S/ 800.00 depende el tipo de vehículo elegido). No se aceptan cancelaciones, cambios de fecha ni reembolsos una vez realizada la reserva. El cliente debe presentarse 30 minutos antes de la hora pactada para la entrega del vehículo.</p>
        </div>

        {/* 3- RESPONSABILIDAD DEL VEHÍCULO */}
        <div>
            <p className="font-semibold text-white">3- RESPONSABILIDAD DEL VEHÍCULO</p>
            <p>El cliente asume total responsabilidad del vehículo al firmar el contrato. Cualquier daño (choques, rayones, fallas mecánicas, etc.) será cubierto por el cliente.</p>
        </div>

        {/* 4- NIVEL DE COMBUSTIBLE */}
        <div>
            <p className="font-semibold text-white">4- NIVEL DE COMBUSTIBLE</p>
            <p>El vehículo debe devolverse con el mismo nivel de combustible con el que fue entregado. Si se devuelve con menos, se descontará el monto equivalente de la garantía. Si hay combustible extra, no se realiza reembolso.</p>
        </div>

        {/* 5- CONDICIÓN DE LIMPIEZA */}
        <div>
            <p className="font-semibold text-white">5- CONDICIÓN DE LIMPIEZA</p>
            <p>El vehículo debe devolverse limpio y lavado. Si no es así, se cobrará un cargo por limpieza desde la garantía. No se verificará el estado del vehículo hasta que esté limpio, lo que podría demorar la devolución de la garantía.</p>
        </div>

        {/* 6- DEVOLUCIÓN Y SANCIONES POR RETRASO */}
        <div>
            <p className="font-semibold text-white">6- DEVOLUCIÓN Y SANCIONES POR RETRASO</p>
            <p>El vehículo debe devolverse en la fecha y hora exactas. Hay 15 minutos de tolerancia.</p>
            <ul className="ml-4 mt-1 space-y-1">
                <li>• Retraso de 16 a 60 minutos: Se cobra el 50% del valor diario.</li>
                <li>• Retraso mayor a 60 minutos: Se cobra el 100% del valor diario + penalidad del 20% de la garantía.</li>
                <li>• Si pasan más de 12 horas sin devolución: Se retiene el 100% de la garantía y se podrían iniciar acciones legales.</li>
            </ul>
        </div>

        {/* 7- HORA Y FECHA DE DEVOLUCIÓN */}
        <div>
            <p className="font-semibold text-white">7- HORA Y FECHA DE DEVOLUCIÓN</p>
            <p>Horario de atención: 7:00 a.m. a 6:00 p.m. de lunes a domingo. Devolución fuera de horario (18:00 a 22:00 horas) tiene costo adicional de S/ 30.00. Se debe notificar con 3 horas de anticipación.</p>
        </div>

        {/* 8- IMPUESTO GENERAL A LAS VENTAS (IGV) */}
        <div>
            <p className="font-semibold text-white">8- IMPUESTO GENERAL A LAS VENTAS (IGV)</p>
            <p>Todos los precios indicados son netos, no incluyen el IGV. El IGV será agregado al momento de la facturación. Esto también aplica a todos los cargos adicionales: penalidades, daños, combustible, limpieza, etc.</p>
        </div>

        {/* 9- AMPLIACIÓN DEL ALQUILER */}
        <div>
            <p className="font-semibold text-white">9- AMPLIACIÓN DEL ALQUILER</p>
            <p>Para ampliar el alquiler, comunicar con 12 horas de anticipación vía correo o WhatsApp. La solicitud será válida sólo si VELORENT la confirma. Se enviará documento de ampliación que el cliente deberá completar y remitir junto con el comprobante de pago.</p>
        </div>

        {/* 10- COBRO POR USO O DAÑO DE LLANTAS */}
        <div>
            <p className="font-semibold text-white">10- COBRO POR USO O DAÑO DE LLANTAS</p>
            <p>Si se detecta llanta baja, desinflada, dañada o uso de llanta de repuesto, la garantía será retenida hasta evaluación técnica. El cliente puede reponer la llanta en 24 horas. De no hacerlo, se procederá al descuento correspondiente.</p>
        </div>

        {/* 11- USO DEL VEHÍCULO */}
        <div>
            <p className="font-semibold text-white">11- USO DEL VEHÍCULO</p>
            <p>Límite de kilometraje: 150 km por día, S/ 0.90 por cada km adicional. Zona de uso: Solo dentro del departamento de Ayacucho. Salir de la zona sin permiso implica pérdida total de la garantía y recuperación inmediata del vehículo.</p>
        </div>

        {/* 12- CONDUCCIÓN RESPONSABLE */}
        <div>
            <p className="font-semibold text-white">12- CONDUCCIÓN RESPONSABLE</p>
            <p>El conductor debe tener mínimo 2 años de antigüedad en su brevete. Solo puede conducir quien está registrado en el contrato. Se debe conducir con prudencia, respetando normas de tránsito. Incumplimientos pueden causar pérdida de cobertura, sanciones o cancelación del contrato.</p>
        </div>

        {/* DECLARACIÓN FINAL */}
        <div className="bg-slate-600/30 p-4 rounded-lg mt-4">
            <p className="font-semibold text-white text-center mb-2">DECLARACIÓN DE ACEPTACIÓN</p>
            <p>El Arrendatario declara haber leído y/o ha escuchado y también por ello está aceptando en su totalidad las políticas de la Empresa, y reconoce que el incumplimiento de las políticas podrá generar la aplicación de sanciones, cobros adicionales, resolución anticipada del contrato o acciones legales correspondientes.</p>
            <p className="mt-2 text-center font-semibold">Con la firma del presente contrato, el Arrendatario acepta expresamente.</p>
        </div>
    </div>
</div>

                      {/* Requisitos */}
                      <div className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/50 backdrop-blur-sm">
                        <h3 className="text-lg font-semibold text-white mb-3">
                          Requisitos Obligatorios
                        </h3>
                        <ul className="space-y-2 text-slate-300 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                            <span>DNI vigente o pasaporte</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                            <span>Licencia con  2+ años (deseable)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                            <span>Copia de recibo de agua o luz</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                            <span>En caso de ser foráneo o extranjero adicionar:</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                            <span>Nombre, dirección, celular del hospedaje y 01 garante</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                            <span>Dirección del domicilio temporal y 01 garante</span>
                          </li>
                        </ul>
                      </div>

                      {/* Checkbox de aceptación */}
                    </div>

                    {/* Sección derecha - Formulario */}
                    <div className="xl:col-span-1 space-y-6">
                      {/* Encabezado del formulario */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          Información para la Reserva
                        </h3>
                        <p className="text-slate-400 text-sm">
                          Complete todos los campos obligatorios
                        </p>
                      </div>

                      {/* Mensaje de error */}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-900/20 border border-red-700/30 rounded-lg p-3 backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-2 text-red-400 text-sm">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">{error}</span>
                          </div>
                        </motion.div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Campos del formulario */}
                        <div className="space-y-4">
                          {/* Nombre */}
                          <div>
                            <label htmlFor="nombre" className="block text-sm font-semibold text-slate-300 mb-1">
                              Nombre Completo *
                            </label>
                            <input
                              type="text"
                              id="nombre"
                              name="nombre"
                              required
                              value={formData.nombre}
                              onChange={handleChange}
                              disabled={isSubmitting}
                              className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 disabled:bg-slate-700/30 disabled:cursor-not-allowed text-white placeholder-slate-400 text-sm backdrop-blur-sm"
                              placeholder="Ingrese su nombre completo"
                            />
                          </div>

                          {/* Email */}
                          <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-1">
                              Email *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              disabled={isSubmitting}
                              className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 disabled:bg-slate-700/30 disabled:cursor-not-allowed text-white placeholder-slate-400 text-sm backdrop-blur-sm"
                              placeholder="ejemplo@correo.com"
                            />
                          </div>

                          {/* Teléfono y DNI en línea */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label htmlFor="numero" className="block text-sm font-semibold text-slate-300 mb-1">
                                Teléfono *
                              </label>
                              <input
                                type="tel"
                                id="numero"
                                name="numero"
                                required
                                value={formData.numero}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 disabled:bg-slate-700/30 disabled:cursor-not-allowed text-white placeholder-slate-400 text-sm backdrop-blur-sm"
                                placeholder="912345678"
                                maxLength={9}
                                pattern="[0-9]{9}"
                              />
                              <p className="text-xs text-slate-500 mt-1">9 dígitos</p>
                            </div>

                            <div>
                              <label htmlFor="dni" className="block text-sm font-semibold text-slate-300 mb-1">
                                DNI *
                              </label>
                              <input
                                type="text"
                                id="dni"
                                name="dni"
                                required
                                value={formData.dni}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 disabled:bg-slate-700/30 disabled:cursor-not-allowed text-white placeholder-slate-400 text-sm backdrop-blur-sm"
                                placeholder="87654321"
                                maxLength={8}
                                pattern="[0-9]{8}"
                              />
                              <p className="text-xs text-slate-500 mt-1">8 dígitos</p>
                            </div>
                          </div>

                          {/* Mensaje */}
                          <div>
                            <label htmlFor="mensaje" className="block text-sm font-semibold text-slate-300 mb-1">
                              Mensaje Adicional
                            </label>
                            <textarea
                              id="mensaje"
                              name="mensaje"
                              rows={3}
                              value={formData.mensaje}
                              onChange={handleChange}
                              disabled={isSubmitting}
                              className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 disabled:bg-slate-700/30 disabled:cursor-not-allowed text-white placeholder-slate-400 text-sm resize-none backdrop-blur-sm"
                              placeholder="Fechas de salida y retorno, información adicional necesaria..."
                            />
                          </div>
                          <div className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/50 backdrop-blur-sm">
                            <div className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                id="agree"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="w-4 h-4 mt-0.5 text-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                              />
                              <label htmlFor="agree" className="text-sm text-slate-300 leading-relaxed cursor-pointer">
                                <span className="font-semibold">He leído y acepto</span> los términos,
                                políticas de alquiler y tratamiento de datos personales.
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Botón de envío */}
                        <motion.button
                          type="submit"
                          disabled={isSubmitting || !agreed}
                          whileHover={agreed && !isSubmitting ? { scale: 1.02 } : {}}
                          whileTap={agreed && !isSubmitting ? { scale: 0.98 } : {}}
                          className={`w-full py-3 px-4 font-semibold rounded-lg transition-all duration-200 text-sm backdrop-blur-sm ${agreed && !isSubmitting
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg hover:shadow-blue-500/25 cursor-pointer border border-blue-500/20"
                            : "bg-slate-700 text-slate-500 cursor-not-allowed border border-slate-600"
                            }`}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Procesando...</span>
                            </div>
                          ) : (
                            "Confirmar solicitud de reserva"
                          )}
                        </motion.button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}