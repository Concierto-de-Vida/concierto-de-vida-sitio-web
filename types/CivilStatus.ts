export const CIVIL_STATUSES = ["single", "married", "union", "divorced", "separated", "widowed", "other"] as const;

export type CivilStatus = (typeof CIVIL_STATUSES)[number];

export function isCivilStatus(value: unknown): value is CivilStatus {
  return typeof value === "string" && CIVIL_STATUSES.includes(value as CivilStatus);
}
