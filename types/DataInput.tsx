import InputType from "./InputType.tsx";
import { Patient } from "../data/models/Patient.ts";

export default interface DataInput {
  id: keyof Patient;
  type: InputType;
  name: string;
  required?: boolean;
}
