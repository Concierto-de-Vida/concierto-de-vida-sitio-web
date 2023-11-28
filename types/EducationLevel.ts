export const EDUCATION_LEVELS = [
  "preschool",
  "primary",
  "secondary",
  "highSchool",
  "technical",
  "bachelor",
  "master",
  "doctorate",
  "none",
] as const;

export type EducationLevel = (typeof EDUCATION_LEVELS)[number];

export function translateEducationLevel(educationLevel: EducationLevel) {
  switch (educationLevel) {
    case "preschool":
      return "Preescolar";
    case "primary":
      return "Primaria";
    case "secondary":
      return "Secundaria";
    case "highSchool":
      return "Preparatoria o Bachillerato";
    case "technical":
      return "Técnico o Comercial";
    case "bachelor":
      return "Licenciatura";
    case "master":
      return "Maestría";
    case "doctorate":
      return "Doctorado";
    case "none":
      return "Ninguno";
  }
}

export function isEducationLevel(value: unknown): value is EducationLevel {
  return typeof value === "string" && EDUCATION_LEVELS.includes(value as EducationLevel);
}
