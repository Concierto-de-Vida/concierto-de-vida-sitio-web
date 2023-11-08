export const GENDERS = ["male", "female", "other"] as const;

export type Gender = (typeof GENDERS)[number];

export function isGender(value: unknown): value is Gender {
  return typeof value === "string" && GENDERS.includes(value as Gender);
}
