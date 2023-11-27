export const DISABILITY_SCALES = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as const;

export type DisabilityScale = (typeof DISABILITY_SCALES)[number];

export function isDisabilityScale(value: unknown): value is DisabilityScale {
  return typeof value === "string" && DISABILITY_SCALES.includes(value as DisabilityScale);
}
