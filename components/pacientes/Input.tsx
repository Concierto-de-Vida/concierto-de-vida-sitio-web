import GetInput from "../GetInput.tsx";
import DataInput from "../../types/DataInput.ts";
import { getTypographyClass } from "../Typography.tsx";
import { Patient } from "../../data/models/Patient.ts";

const styles = {
  label:
    `whitespace-nowrap flex items-center gap-2 max-w-full md:max-w-[40%] font-semibold ` +
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

  const { id, type, name } = data;
  const marginTop = type === "date" ? "mt-2" : "";
  return (
    <label class={`flex gap-2 flex-wrap md:flex-nowrap ${className} ${marginTop}`} title={name}>
      <div class={`${styles.label} ${type !== "date" ? "md:mb-[-3px]" : ""}`}>
        <p class="truncate text-ellipsis font-semibold select-none">{name}:</p>
      </div>

      <GetInput
        {...data}
        defaultValue={patient?.[id] || undefined}
        class={type === "dropdown" ? "" : "border-b-2 border-b-black"}
      />
    </label>
  );
}
