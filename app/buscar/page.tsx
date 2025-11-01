/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PLANES_DEFAULT, PlanKey, getPrecioYBeneficios, normalizePlan } from "@/app/utils/planes";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import carrosData from "../data/cars.json";
import Footer from "../footer";
import Navbar from "../navbar";

function BuscarContent() {
  const params = useSearchParams();
  const tipo = (params.get("tipo") || "").toLowerCase(); // "plan" o ""
  const vehiculoSlug = params.get("vehiculo") || "";
  const planParam = normalizePlan(params.get("plan"));

  // 1) Auto → mostrar sus 3 planes con precio/beneficios propios
  if (tipo === "plan" && vehiculoSlug && !planParam) {
    const car = (carrosData as any[]).find((c) => c.slug === vehiculoSlug);
    if (!car) return <Empty msg="No se encontró el vehículo seleccionado." />;

    const planes: PlanKey[] = ["basico", "plus", "libre"];
    return (
      <Section title={`Planes disponibles para ${car.marca} ${car.modelo}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {planes.map((p) => {
            const data = getPrecioYBeneficios(car, p);
            return (
              <CardPlan
                key={p}
                titulo={PLANES_DEFAULT[p].label}
                precio={data.precio}
                beneficios={data.beneficios}
                image={car.imagenes?.[0]}
                ctaLink={`/vehiculos/${car.slug}?plan=${p}`}
                ctaText="Ver detalle"
                chip={`${car.marca} ${car.modelo}`}
              />
            );
          })}
        </div>
      </Section>
    );
  }

  // 2) Plan → listar todos los autos con el precio/beneficios de ese plan según cada auto
  if (tipo === "plan" && planParam && !vehiculoSlug) {
    const label = PLANES_DEFAULT[planParam].label;
    return (
      <Section title={`Vehículos con ${label}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {(carrosData as any[]).map((car) => {
            const data = getPrecioYBeneficios(car, planParam);
            return (
              <CardAutoPlan
                key={car.id}
                car={car}
                precio={data.precio}
                planLabel={label}
                link={`/vehiculos/${car.slug}?plan=${planParam}`}
              />
            );
          })}
        </div>
      </Section>
    );
  }

  // 3) Fallback: listado base
  return (
    <Section title="Resultados de tu búsqueda">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {(carrosData as any[]).map((car) => (
          <CardAutoPlan
            key={car.id}
            car={car}
            precio={car.precio}
            planLabel="Precio base"
            link={`/vehiculos/${car.slug}`}
          />
        ))}
      </div>
    </Section>
  );
}

export default function Buscar() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="text-center py-20">Cargando...</div>}>
        <BuscarContent />
      </Suspense>
      <Footer />
    </>
  );
}

// ------- helpers UI (igual que antes, adaptado) -------

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 py-16 md:pt-56">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-blue-400 rounded-full" />
            <span className="text-blue-600 font-semibold tracking-widest text-sm uppercase">Resultados</span>
            <div className="w-12 h-0.5 bg-blue-400 rounded-full" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            {title}
          </motion.h1>
        </div>
        {children}
      </div>
    </div>
  );
}

function Empty({ msg }: { msg: string }) {
  return (
    <Section title="Sin resultados">
      <p className="text-center text-slate-600">{msg}</p>
    </Section>
  );
}

function CardPlan({
  titulo, precio, beneficios, image, ctaLink, ctaText, chip,
}: {
  titulo: string; precio: number; beneficios: string[]; image?: string; ctaLink: string; ctaText: string; chip?: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200">
      <div className="relative h-40 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        {image && <Image src={image} alt={titulo} fill className="object-cover" />}
        {chip && (
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold border border-slate-200 shadow-sm">{chip}</span>
          </div>
        )}
        <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 rounded-xl shadow">
          <span className="text-2xl font-bold text-green-600">S/{precio.toFixed(2)}</span>
          <span className="text-slate-500 text-sm ml-1">/día</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-3">{titulo}</h3>
        <ul className="text-slate-600 text-sm space-y-1 mb-4 list-disc ml-5">
          {beneficios.map((b) => <li key={b}>{b}</li>)}
        </ul>
        <Link href={ctaLink} className="w-full block text-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl shadow">
          {ctaText}
        </Link>
      </div>
    </motion.div>
  );
}

function CardAutoPlan({ car, precio, planLabel, link }:{ car: any; precio: number; planLabel: string; link: string; }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200">
      <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        <Image src={car.imagenes[0]} alt={`${car.marca} ${car.modelo}`} fill className="object-cover" />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold border border-slate-200 shadow-sm">{planLabel}</span>
        </div>
        <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 rounded-xl shadow">
          <span className="text-2xl font-bold text-green-600">S/{precio.toFixed(2)}</span>
          <span className="text-slate-500 text-sm ml-1">/día</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-1">{car.marca} {car.modelo}</h3>
        <p className="text-slate-600 text-sm mb-3">{car.descripcion}</p>
        <div className="text-xs text-slate-500 mb-4">
          Transmisión: <strong>{car.especificaciones.transmision}</strong> · Asientos: <strong>{car.especificaciones.pasajeros}</strong>
        </div>
        <Link href={link} className="w-full block text-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl shadow">
          Ver detalle
        </Link>
      </div>
    </motion.div>
  );
}
