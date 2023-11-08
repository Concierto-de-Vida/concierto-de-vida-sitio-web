import { z } from "zod";
import { GENDERS, isGender } from "../../types/Genders.tsx";
import { CIVIL_STATUSES, isCivilStatus } from "../../types/CivilStatus.tsx";

export type Patient = z.infer<typeof PatientModel>;

const PatientModel = z.object({
  firstName: z.string(),
  lastName: z.string(),
  birthdate: z.number(),
  createdAt: z.number(),
  email: z.string().email(),
  gender: z.enum(GENDERS),
  civilStatus: z.enum(CIVIL_STATUSES),
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

    case "gender":
      if (!isGender(value)) throw new Error("value is not a valid gender: " + value);
      return (patient[key] = value);

    case "civilStatus":
      if (!isCivilStatus(value)) throw new Error("value is not a valid civil status: " + value);
      return (patient[key] = value);

    case "firstName":
    case "lastName":
    case "email":
      return (patient[key] = value as string);
  }
}
