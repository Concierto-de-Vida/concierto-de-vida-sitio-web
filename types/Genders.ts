export const GENDERS = ["male", "female", "other"] as const;

export type Gender = (typeof GENDERS)[number];

export function translateGender(gender: Gender) {
  switch (gender) {
    case "male":
      return "Masculino";
    case "female":
      return "Femenino";
    case "other":
      return "Otro";
  }
}

export function isGender(value: unknown): value is Gender {
  return typeof value === "string" && GENDERS.includes(value as Gender);
}
