import carrosData from "@/app/data/cars.json";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ClientVehicleDetails from "./ClientVehicleDetails";

type PageProps = {
  // 👇 Reciben Promesa y se hace await dentro del componente
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function VehiculoDetalle({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = (await searchParams) ?? {};

  const existe = carrosData.some((v) => v.slug === slug);
  if (!existe) notFound();

  const initialPlan = (typeof sp.plan === "string" ? sp.plan : undefined) ?? null;

  return (
    <Suspense fallback={<div className="py-40 text-center">Cargando…</div>}>
      <div className="py-40">
        <ClientVehicleDetails slug={slug} initialPlan={initialPlan} />
      </div>
    </Suspense>
  );
}

// Generación de rutas estáticas
export async function generateStaticParams() {
  return carrosData.map((vehiculo) => ({ slug: vehiculo.slug }));
}
