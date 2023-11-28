export const CIVIL_STATUSES = ["single", "married", "union", "divorced", "separated", "widowed", "other"] as const;

export type CivilStatus = (typeof CIVIL_STATUSES)[number];

export function translateCivilStatus(civilStatus: CivilStatus) {
  switch (civilStatus) {
    case "single":
      return "Soltero(a)";
    case "married":
      return "Casado(a)";
    case "union":
      return "Unión libre";
    case "divorced":
      return "Divorciado(a)";
    case "separated":
      return "Separado(a)";
    case "widowed":
      return "Viudo(a)";
    case "other":
      return "Otro";
  }
}

export function isCivilStatus(value: unknown): value is CivilStatus {
  return typeof value === "string" && CIVIL_STATUSES.includes(value as CivilStatus);
}
