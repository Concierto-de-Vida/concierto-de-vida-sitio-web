import { z } from "zod";

export type Patient = z.infer<typeof PatientModel>;

const PatientModel = z.object({
  firstName: z.string(),
  lastName: z.string(),
  birthdate: z.number(),
  createdAt: z.number(),
  email: z.string().email(),
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
): Patient[keyof Patient] {
  switch (key) {
    case "birthdate":
    case "createdAt":
      return (patient[key] = value as number);

    case "firstName":
    case "lastName":
    case "email":
      return (patient[key] = value as string);
  }
}
