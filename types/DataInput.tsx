import InputType from "./InputType.tsx";
import { Patient } from "../data/models/Patient.ts";

export default interface DataInput {
  id: keyof Patient;
  type: InputType;
  name: string;
  required?: boolean;
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}
