// { id: "preschool", name: "Preescolar" },
// { id: "primary", name: "Primaria" },
// { id: "secondary", name: "Secundaria" },
// { id: "highSchool", name: "Preparatoria o Bachillerato" },
// { id: "technical", name: "Técnico o Comercial" },
// { id: "bachelor", name: "Licenciatura" },
// { id: "master", name: "Maestría" },
// { id: "doctorate", name: "Doctorado" },
// { id: "none", name: "Sin escolaridad" },

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

export function isEducationLevel(value: unknown): value is EducationLevel {
  return typeof value === "string" && EDUCATION_LEVELS.includes(value as EducationLevel);
}
