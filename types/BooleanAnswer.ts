export const BOOLEAN_ANSWERS = ["yes", "no"] as const;

export type BooleanAnswer = (typeof BOOLEAN_ANSWERS)[number];

export function isBooleanAnswer(value: unknown): value is BooleanAnswer {
  return typeof value === "string" && BOOLEAN_ANSWERS.includes(value as BooleanAnswer);
}
