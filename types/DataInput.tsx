import InputType from "./InputType.tsx";
import { Patient } from "../data/models/Patient.ts";

interface GenericDataInput {
  id: keyof Patient;
  name: string;
  required?: boolean;
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export interface DateDataInput extends GenericDataInput {
  type: Extract<InputType, "date">;
  /** If true, hours and below are not going to be required */
  onlyDate?: boolean;
}

export interface NumberDataInput extends GenericDataInput {
  type: Extract<InputType, "number">;
}

export interface TextDataInput extends GenericDataInput {
  type: Extract<InputType, "text">;
}

type DataInput = DateDataInput | NumberDataInput | TextDataInput;

export default DataInput;
