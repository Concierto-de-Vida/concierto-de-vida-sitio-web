import InputType from "./InputType.tsx";
import Autocomplete from "./Autocomplete.tsx";
import { Patient } from "../data/models/Patient.ts";
import { DateElements } from "../islands/GetDateInput.tsx";

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
  autocomplete?: Partial<Record<DateElements, Autocomplete>>;
}

export interface NumberDataInput extends GenericDataInput {
  type: Extract<InputType, "number">;
  autocomplete?: Autocomplete;
}

export interface TextDataInput extends GenericDataInput {
  type: Extract<InputType, "text">;
  autocomplete?: Autocomplete;
}

export interface Option {
  id: string;
  name: string;
}

export interface CheckboxDataInput extends GenericDataInput {
  type: Extract<InputType, "checkbox">;
  options: Option[];
}

export interface RadioDataInput extends GenericDataInput {
  type: Extract<InputType, "radio">;
  options: Option[];
}

type DataInput = DateDataInput | NumberDataInput | TextDataInput | CheckboxDataInput | RadioDataInput;

export default DataInput;
