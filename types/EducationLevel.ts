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
