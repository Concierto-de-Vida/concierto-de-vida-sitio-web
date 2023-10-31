import { z } from "zod";

export type Patient = z.infer<typeof PatientModel>;

const PatientModel = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

export default PatientModel;
