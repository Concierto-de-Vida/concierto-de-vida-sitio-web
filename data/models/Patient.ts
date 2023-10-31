import { z } from "zod";

export type Patient = z.infer<typeof PatientModel>;

const PatientModel = z.object({
  firstName: z.string(),
  lastName: z.string(),
  birthdate: z.date(),
});

export default PatientModel;

/**
 * @param patient Optional object to mutate
 * @returns The casted value
 */
export function castPatientValue(
  key: keyof Patient,
  value: unknown,
  patient: Patient = {} as Patient
): string | Date {
  switch (key) {
    case "birthdate":
      return (patient[key] = new Date(value as string));

    case "firstName":
    case "lastName":
      return (patient[key] = value as string);

    default:
      return key as never;
  }
}
