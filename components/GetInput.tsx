import { JSX } from "preact";
import InputType from "../types/InputType.tsx";
import GetDateInput from "../islands/GetDateInput.tsx";

interface GetInputProps extends JSX.HTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder?: string;
  type: InputType;
  onlyDate?: boolean;
}

export default function GetInput({
  id,
  type,
  step,
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
  }
}
