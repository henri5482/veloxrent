// utils/planes.ts

export type PlanKey = "basico" | "plus" | "libre";
export type AnyPlanKey = PlanKey | "normal";

export type PlanInfoDefault = {
  key: PlanKey;
  label: string;
  // Solo para fallback si el auto NO define precio
  factor: number;
  beneficios: string[];
};

// Etiquetas y beneficios por defecto (se usan SOLO si el auto no trae beneficios)
export const PLANES_DEFAULT: Record<PlanKey, PlanInfoDefault> = {
  basico: {
    key: "basico",
    label: "Plan Básico",
    factor: 1.0,
    beneficios: ["Seguro a terceros", "1 conductor", "100 km/día", "Asistencia 24/7"]
  },
  plus: {
    key: "plus",
    label: "Plan Plus",
    factor: 1.15,
    beneficios: ["Seguro ampliado", "2 conductores", "200 km/día", "Asistencia en ruta"]
  },
  libre: {
    key: "libre",
    label: "Plan Libre",
    factor: 1.3,
    beneficios: ["Cobertura total", "Conductores ilimitados", "Km ilimitado", "Mantenimiento incluido"]
  }
};

export function normalizePlan(p?: string | null): PlanKey | null {
  if (!p) return null;
  const key = p.toLowerCase().trim() as AnyPlanKey;
  if (key === "normal") return "plus";
  if (key === "basico" || key === "plus" || key === "libre") return key;
  return null;
}

// Tipos del JSON (solo lo que usamos)
export type CarPlanOverride = {
  precio?: number;
  beneficios?: string[];
};

export type CarWithPlanes = {
  precio: number; // precio base (fallback)
  planes?: Partial<Record<PlanKey, CarPlanOverride>>;
};

export function getPrecioYBeneficios(
  car: CarWithPlanes,
  plan: PlanKey
): { precio: number; beneficios: string[]; label: string } {
  const def = PLANES_DEFAULT[plan];
  const override = car.planes?.[plan];

  const precio =
    override?.precio ??
    Math.round(car.precio * def.factor * 100) / 100; // fallback por factor

  const beneficios = override?.beneficios?.length ? override.beneficios : def.beneficios;

  return { precio, beneficios, label: def.label };
}
