import { JSX } from "preact";
import InputType from "../types/InputType.ts";
import { Option } from "../types/DataInput.ts";
import { SignalLike } from "$fresh/src/types.ts";
import Autocomplete from "../types/Autocomplete.ts";
import GetDateInput, { DateElements, isAutocompleteRecord } from "../islands/GetDateInput.tsx";

interface GetInputProps extends Omit<JSX.HTMLAttributes<HTMLInputElement>, "autocomplete"> {
  id: string;
  placeholder?: string;
  type: InputType;
  onlyDate?: boolean;
  options?: Option[];
  autocomplete?: Partial<Record<DateElements, Autocomplete>> | Autocomplete | SignalLike<Autocomplete>;
}

export default function GetInput({
  id,
  type,
  step,
  options,
  onlyDate,
  placeholder,
  autocomplete,
  defaultValue,
  class: className,
  ...props
}: GetInputProps): JSX.Element {
  const classes = `px-1 md:px-2 w-full ${className ?? ""}`;

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
          defaultValue={defaultValue}
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
          step={step ?? undefined}
          placeholder={placeholder}
          defaultValue={defaultValue}
          autoComplete={autocomplete}
        />
      );

    case "date":
      if ((typeof autocomplete === "string" || !isAutocompleteRecord(autocomplete)) && autocomplete)
        throw new Error("Autocomplete must be an object: " + autocomplete);
      return <GetDateInput autocomplete={autocomplete} defaultValue={defaultValue} onlyDate={onlyDate} id={id} />;

    case "checkbox":
      return <p>To do</p>;

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
                defaultChecked={defaultValue === option.id}
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
            <option value={option.id} selected={defaultValue === option.id}>
              {option.name}
            </option>
          ))}
        </select>
      );
  }
}
