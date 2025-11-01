export type PlanKey = "basico" | "plus" | "libre";

export const PLANES_DEFAULT: Record<PlanKey, { label: string }> = {
  basico: { label: "Plan Básico" },
  plus: { label: "Plan Plus" },
  libre: { label: "Plan Libre" },
};

// Si tenías algo como 1.0, cámbialo a 1
export const MULTIPLICADORES: Record<PlanKey, number> = {
  basico: 1,      // ← antes: 1.0  (S7748)
  plus: 1.2,
  libre: 1.35,
};

export function normalizePlan(p?: string | null): PlanKey | null {
  if (!p) return null;
  const v = p.toLowerCase();
  if (v === "normal") return "plus";
  if (v === "plus" || v === "basico" || v === "libre") return v as PlanKey;
  return null;
}

// Ejemplo de implementación: combina precio base del auto con multiplicador del plan
export function getPrecioYBeneficios(
  vehiculo: { precio: number },
  plan: PlanKey
) {
  const base = vehiculo.precio;
  const precio = Math.round(base * MULTIPLICADORES[plan] * 100) / 100;

  const beneficiosPorPlan: Record<PlanKey, string[]> = {
    basico: [
      "Kilometraje limitado",
      "Cobertura básica",
      "1 conductor autorizado",
    ],
    plus: [
      "Kilometraje moderado",
      "Cobertura ampliada",
      "2 conductores",
      "Asistencia en carretera",
    ],
    libre: [
      "Kilometraje ilimitado",
      "Cobertura full riesgo",
      "2 conductores",
      "Entrega y recojo en ciudad",
    ],
  };

  return {
    label: PLANES_DEFAULT[plan].label,
    precio,
    beneficios: beneficiosPorPlan[plan],
  };
}
