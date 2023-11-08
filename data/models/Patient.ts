import { z } from "zod";
import { GENDERS, isGender } from "../../types/Genders.ts";
import { CIVIL_STATUSES, isCivilStatus } from "../../types/CivilStatus.ts";
import { EDUCATION_LEVELS, isEducationLevel } from "../../types/EducationLevel.ts";

export type Patient = z.infer<typeof PatientModel>;

const PatientModel = z.object({
  firstName: z.string(),
  lastName: z.string(),
  birthdate: z.number(),
  createdAt: z.number(),
  email: z.string().email(),
  gender: z.enum(GENDERS),
  civilStatus: z.enum(CIVIL_STATUSES),
  educationLevel: z.enum(EDUCATION_LEVELS),
  phone: z.string(),
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

    case "educationLevel":
      if (!isEducationLevel(value)) throw new Error("value is not a valid education level: " + value);
      return (patient[key] = value);

    case "firstName":
    case "lastName":
    case "email":
    case "phone":
      return (patient[key] = value as string);
  }
}
