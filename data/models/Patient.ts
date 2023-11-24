import { z } from "zod";
import { CITIES, isCity } from "../../types/City.ts";
import { GENDERS, isGender } from "../../types/Genders.ts";
import { CIVIL_STATUSES, isCivilStatus } from "../../types/CivilStatus.ts";
import { BOOLEAN_ANSWERS, isBooleanAnswer } from "../../types/BooleanAnswer.ts";
import { EDUCATION_LEVELS, isEducationLevel } from "../../types/EducationLevel.ts";
import { DISABILITY_SCALES, isDisabilityScale } from "../../types/DisabilityScale.ts";

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
  phone: z.array(z.string()),
  streetAddress: z.string(),
  streetAddressNumber: z.string(),
  neighborhood: z.string(),
  city: z.enum(CITIES),
  municipality: z.string(),
  medicalService: z.string().optional(),
  doctorTreating: z.string().optional(),
  diagnosisDate: z.number().optional(),
  treatment: z.string().optional(),
  currentMedication: z.array(z.string()).optional(),
  treatmentFrequency: z.string().optional(),
  hospitalization: z.string().optional(),
  familyWithEM: z.enum(BOOLEAN_ANSWERS),
  familyWithEMRelationship: z.array(z.string()).optional(),
  relapses: z.number().optional(),
  lastRelapse: z.number().optional(),
  disabilityScale: z.enum(DISABILITY_SCALES),
  usesAid: z.enum(BOOLEAN_ANSWERS),
  aid: z.array(z.string()).optional(),
  bladderControl: z.enum(BOOLEAN_ANSWERS),
  needsHelp: z.enum(BOOLEAN_ANSWERS),
  helpActivities: z.array(z.string()).optional(),
  helpActivitiesTime: z.string().optional(),
  caregivers: z.enum(BOOLEAN_ANSWERS),
  caregiverName: z.array(z.string()).optional(),
  caregiverRelationship: z.array(z.string()).optional(),
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
    // NUMBERS //
    case "relapses":
    case "birthdate":
    case "createdAt":
    case "lastRelapse":
    case "diagnosisDate":
      return (patient[key] = +(value as number));

    // STRING ARRAYS //
    case "aid":
    case "phone":
    case "caregiverName":
    case "helpActivities":
    case "currentMedication":
    case "caregiverRelationship":
    case "familyWithEMRelationship":
      return (patient[key] = value as string[]);

    // STRINGS //
    default:
      return (patient[key] = `${value}`);

    // ENUMS //
    case "usesAid":
    case "needsHelp":
    case "caregivers":
    case "familyWithEM":
    case "bladderControl":
      if (!isBooleanAnswer(value)) throw new Error("value is not a valid boolean answer: " + value);
      return (patient[key] = value);
    case "gender":
      if (!isGender(value)) throw new Error("value is not a valid gender: " + value);
      return (patient[key] = value);
    case "civilStatus":
      if (!isCivilStatus(value)) throw new Error("value is not a valid civil status: " + value);
      return (patient[key] = value);
    case "educationLevel":
      if (!isEducationLevel(value)) throw new Error("value is not a valid education level: " + value);
      return (patient[key] = value);
    case "city":
      if (!isCity(value)) throw new Error("value is not a valid city: " + value);
      return (patient[key] = value);
    case "disabilityScale":
      if (!isDisabilityScale(value)) throw new Error("value is not a valid disability scale: " + value);
      return (patient[key] = value);
  }
}
