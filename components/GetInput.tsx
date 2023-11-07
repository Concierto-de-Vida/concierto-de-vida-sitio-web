import { JSX } from "preact";
import InputType from "../types/InputType.tsx";
import { Option } from "../types/DataInput.tsx";
import GetDateInput from "../islands/GetDateInput.tsx";

interface GetInputProps extends JSX.HTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder?: string;
  type: InputType;
  onlyDate?: boolean;
  options?: Option[];
}

export default function GetInput({
  id,
  type,
  step,
  options,
  onlyDate,
  placeholder,
  class: className,
  ...props
}: GetInputProps): JSX.Element {
  const classes = `px-1 md:px-2 w-full ${className ?? ""}`;

  switch (type) {
    case "number":
      return (
        <input
          {...props}
          id={id}
          name={id}
          class={classes}
          type={"number"}
          placeholder={placeholder}
          step={step ?? "0.000000001"}
        />
      );

    case "text":
      return (
        <input
          {...props}
          id={id}
          name={id}
          type={"text"}
          class={classes}
          step={step ?? undefined}
          placeholder={placeholder}
        />
      );

    case "date":
      return <GetDateInput defaultValue={props.defaultValue} onlyDate={onlyDate} id={id} />;

    case "checkbox":
      return <p>To do</p>;

    case "radio":
      return (
        <div class="flex flex-wrap gap-2">
          {options?.map((option) => (
            <div class="flex items-center gap-2">
              <input
                name={id}
                type="radio"
                class={classes}
                value={option.id}
                id={`${id}_${option.id}`}
                checked={props.defaultValue === option.id}
                {...props}
              />
              <label class="flex items-center gap-2" for={`${id}_${option.id}`}>
                {option.name}
              </label>
            </div>
          ))}
        </div>
      );
  }
}
