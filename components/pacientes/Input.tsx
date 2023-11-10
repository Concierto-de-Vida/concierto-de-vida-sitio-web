import GetInput from "../GetInput.tsx";
import DataInput from "../../types/DataInput.ts";
import { getTypographyClass } from "../Typography.tsx";
import { Patient } from "../../data/models/Patient.ts";

const styles = {
  label:
    `whitespace-nowrap flex items-top gap-2 max-w-full md:max-w-[40%] font-semibold ` +
    `${getTypographyClass("p")}`,
};

interface InputProps {
  data: DataInput | DataInput[];
  class?: string;
  patient?: Patient;
}

export default function Input({ data, class: className = "", patient }: InputProps) {
  if (Array.isArray(data)) {
    const cols = data.reduce((acc, curr) => acc + (curr.colSpan ?? 1), 0);

    return (
      <div class={`grid grid-cols-1 md:grid-cols-${cols} gap-3`}>
        {data.map((data) => (
          <Input
            data={data}
            key={data.id}
            patient={patient}
            class={data.colSpan === undefined ? "" : `col-span-${data.colSpan}`}
          />
        ))}
      </div>
    );
  }

  const { id, type, name, required } = data;
  const marginTop = type === "date" ? "mt-2" : "";
  return (
    <label
      class={`flex gap-2 flex-wrap md:flex-nowrap ${className} ${marginTop}`}
      title={name + (required ? " (requerido)" : "")}
    >
      <div class={`${styles.label} ${type !== "date" ? "md:mb-[-3px]" : ""}`}>
        <p class="truncate text-ellipsis font-semibold select-none">
          {name}
          {required ? (
            <span class="text-red-700 font-normal" title="Requerido">
              *
            </span>
          ) : null}
        </p>
      </div>

      <GetInput
        {...data}
        defaultValue={patient?.[id] || undefined}
        class={type === "dropdown" ? "" : "border-b-2 border-b-black h-[fit-content]"}
      />
    </label>
  );
}
