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
  const classes = `px-2 w-full ${className ?? ""}`;

  switch (type) {
    case "number":
      return (
        <input
          {...props}
          id={id}
          name={id}
          class={classes}
          placeholder={placeholder}
          type={"number"}
          step={step ?? "0.000000001"}
        />
      );

    case "text":
      return (
        <input
          {...props}
          id={id}
          name={id}
          class={classes}
          placeholder={placeholder}
          type={"text"}
          step={step ?? undefined}
        />
      );

    case "date":
      return <GetDateInput onlyDate={onlyDate} id={id} />;
  }
}
