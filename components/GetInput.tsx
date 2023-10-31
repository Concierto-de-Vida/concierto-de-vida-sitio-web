import { JSX } from "preact";
import InputType from "../types/InputType.tsx";

interface GetInputProps extends JSX.HTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder?: string;
  type: InputType;
}

export default function GetInput({ id, type, placeholder, step, class: className, ...props }: GetInputProps) {
  const classes = `px-2 w-full ${className ?? ""}`;

  const isNumber = type === "number";
  return (
    <input
      {...props}
      id={id}
      name={id}
      class={classes}
      placeholder={placeholder}
      type={isNumber ? "number" : "text"}
      step={step ?? (isNumber ? "0.000000001" : undefined)}
    />
  );
}
