import GetInput from "../GetInput.tsx";
import DataInput from "../../types/DataInput.tsx";
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
            patient={patient}
            class={data.colSpan === undefined ? "" : `col-span-${data.colSpan}`}
          />
        ))}
      </div>
    );
  }

  const { id, type, name, required } = data;
  return (
    <div class={`flex gap-2 flex-wrap md:flex-nowrap ${className}`} title={name}>
      <label for={id} class={`${styles.label} ${type !== "date" ? "mb-[-10px]" : ""}`}>
        <p class="truncate text-ellipsis">{name}:</p>
      </label>

      {
        <GetInput
          id={id}
          type={type}
          required={required}
          class="border-b-2 border-b-black"
          defaultValue={(patient?.[id] ?? "").toString()}
          onlyDate={"onlyDate" in data ? data.onlyDate : false}
        />
      }
    </div>
  );
}
