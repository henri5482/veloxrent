export type PlanKey = "basico" | "plus" | "libre";

export const PLANES_DEFAULT: Record<PlanKey, { label: string }> = {
  basico: { label: "Plan Normal" }, // tu plan básico real
  plus: { label: "Plan Plus" },     // tu plan medio
  libre: { label: "Plan Libre" },   // kilometraje ilimitado
};

/**
 * Normaliza el parámetro de plan desde la URL
 */
export function normalizePlan(p?: string | null): PlanKey | null {
  if (!p) return null;
  const v = p.toLowerCase();
  if (v === "normal") return "basico";
  if (v === "plus" || v === "basico" || v === "libre") return v as PlanKey;
  return null;
}

/**
 * 🔧 Esta función ahora LEE directamente del JSON
 * Ya no usa multiplicadores ni cálculos.
 * 
 * Cada vehículo tiene sus propios precios y beneficios por plan.
 */
export function getPrecioYBeneficios(
  vehiculo: {
    planes?: Record<PlanKey, { precio: number; beneficios: string[] }>;
  },
  plan: PlanKey
) {
  const fallback = {
    precio: 0,
    beneficios: [] as string[],
    label: PLANES_DEFAULT[plan].label,
  };

  if (!vehiculo?.planes) return fallback;

  const data = vehiculo.planes[plan];
  if (!data) return fallback;

  return {
    precio: Number(data.precio) || 0,
    beneficios: Array.isArray(data.beneficios) ? data.beneficios : [],
    label: PLANES_DEFAULT[plan].label,
  };
}
