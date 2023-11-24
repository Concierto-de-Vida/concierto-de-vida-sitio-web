import { JSX } from "preact";
import InputType from "../types/InputType.ts";
import { Option } from "../types/DataInput.ts";
import { SignalLike } from "$fresh/src/types.ts";
import ArrayInput from "../islands/ArrayInput.tsx";
import Autocomplete from "../types/Autocomplete.ts";
import GetDateInput, { DateElements } from "../islands/GetDateInput.tsx";

type AutocompleteRecord = Partial<Record<DateElements, Autocomplete>>;
function isAutocompleteRecord(autocomplete: unknown): autocomplete is AutocompleteRecord {
  return typeof autocomplete === "object";
}

export interface GetInputProps
  extends Omit<JSX.HTMLAttributes<HTMLInputElement>, "autocomplete" | "defaultValue"> {
  id: string;
  placeholder?: string;
  type: InputType;
  onlyDate?: boolean;
  options?: Option[];
  autocomplete?: Partial<Record<DateElements, Autocomplete>> | Autocomplete | SignalLike<Autocomplete>;
  /** Buttons to add more or remove */
  array?: boolean;
  defaultValue?: string | number | boolean | string[] | number[] | boolean[];
}

export default function GetInput(allProps: GetInputProps): JSX.Element {
  const {
    id,
    type,
    step,
    array,
    options,
    onlyDate,
    placeholder,
    autocomplete,
    defaultValue,
    class: className,
    ...props
  } = allProps;

  const classes = `px-1 md:px-2 w-full ${className ?? ""}`;

  if (array) {
    const { array: _, ...propsWithoutArray } = allProps;
    return <ArrayInput {...propsWithoutArray} />;
  }

  switch (type) {
    case "number":
      if (autocomplete && isAutocompleteRecord(autocomplete))
        throw new Error("Autocomplete must be a string: " + autocomplete);
      return (
        <input
          {...props}
          id={id}
          name={id}
          type="number"
          class={classes}
          placeholder={placeholder}
          autoComplete={autocomplete}
          defaultValue={defaultValue?.toString()}
          step={step ?? "0.000000001"}
        />
      );

    case "text":
      if (autocomplete && isAutocompleteRecord(autocomplete))
        throw new Error("Autocomplete must be a string: " + autocomplete);
      return (
        <input
          {...props}
          id={id}
          name={id}
          type="text"
          class={classes}
          placeholder={placeholder}
          autoComplete={autocomplete}
          defaultValue={defaultValue?.toString()}
        />
      );

    case "date":
      if ((typeof autocomplete === "string" || !isAutocompleteRecord(autocomplete)) && autocomplete)
        throw new Error("Autocomplete must be an object: " + autocomplete);
      return (
        <GetDateInput
          id={id}
          onlyDate={onlyDate}
          autocomplete={autocomplete}
          defaultValue={defaultValue?.toString()}
        />
      );

    case "checkbox":
      return (
        <div class="flex">
          {options?.map((option) => (
            <div class="flex items-center">
              <input
                {...props}
                name={id}
                type="checkbox"
                class={classes}
                value={option.id}
                id={`${id}_${option.id}`}
                defaultChecked={
                  defaultValue === option.id || (defaultValue === undefined && option.defaultSelected)
                }
              />

              <label class="flex items-center pl-1 pr-4 select-none" for={`${id}_${option.id}`}>
                {option.name}
              </label>
            </div>
          ))}
        </div>
      );

    case "radio":
      return (
        <div class="flex flex-wrap">
          {options?.map((option) => (
            <div class="flex items-center">
              <input
                {...props}
                name={id}
                type="radio"
                class={classes}
                value={option.id}
                id={`${id}_${option.id}`}
                defaultChecked={
                  defaultValue === option.id || (defaultValue === undefined && option.defaultSelected)
                }
              />

              <label class="flex items-center pl-1 pr-4 select-none" for={`${id}_${option.id}`}>
                {option.name}
              </label>
            </div>
          ))}
        </div>
      );

    case "dropdown":
      return (
        <select id={id} name={id} class={`${classes} px-2 w-full bg-gray-200 rounded`}>
          {options?.map((option) => (
            <option
              value={option.id}
              selected={
                defaultValue === option.id || (defaultValue === undefined && option.defaultSelected) || undefined
              }
            >
              {option.name}
            </option>
          ))}
        </select>
      );
  }
}
