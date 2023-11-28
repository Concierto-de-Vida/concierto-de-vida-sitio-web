export const BOOLEAN_ANSWERS = ["yes", "no"] as const;

export type BooleanAnswer = (typeof BOOLEAN_ANSWERS)[number];

export function translateBooleanAnswer(booleanAnswer: BooleanAnswer) {
  switch (booleanAnswer) {
    case "yes":
      return "Sí";
    case "no":
      return "No";
  }
}

export function isBooleanAnswer(value: unknown): value is BooleanAnswer {
  return typeof value === "string" && BOOLEAN_ANSWERS.includes(value as BooleanAnswer);
}
