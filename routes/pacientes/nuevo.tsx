import db from "../../data/database.ts";
import { Handlers } from "$fresh/server.ts";
import redirect from "../../utils/redirect.ts";
import Button from "../../components/Button.tsx";
import DataInput from "../../types/DataInput.tsx";
import GetInput from "../../components/GetInput.tsx";
import { Patient, castPatientValue } from "../../data/models/Patient.ts";
import Typography, { getTypographyClass } from "../../components/Typography.tsx";

const styles = {
  label:
    `whitespace-nowrap flex items-center gap-2 max-w-full md:max-w-[40%] font-semibold ` +
    `${getTypographyClass("p")}`,
  colsImport: "",
};

const DATA: (DataInput | DataInput[])[] = [
  [
    {
      id: "firstName",
      type: "text",
      name: "Nombre(s)",
      required: true,
    },
    {
      id: "lastName",
      type: "text",
      name: "Apellidos",
      required: true,
    },
  ],
  {
    id: "birthdate",
    type: "text",
    name: "Fecha de nacimiento",
    required: true,
  },
];

export const handler: Handlers = {
  async GET(_, ctx) {
    return await ctx.render();
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const newPatient = {} as Patient;

    for (const data of DATA.flat()) {
      const value = form.get(data.id)?.toString();
      if (value === undefined && data.required) return ctx.renderNotFound();
      if (value !== undefined) castPatientValue(data.id, value, newPatient);
    }

    await db.patients.add(newPatient);

    return redirect("/pacientes");
  },
};

function Input({ data, class: className = "" }: { data: DataInput | DataInput[]; class?: string }) {
  if (Array.isArray(data)) {
    const cols = data.reduce((acc, curr) => acc + (curr.colSpan ?? 1), 0);

    return (
      <div class={`grid grid-cols-1 md:grid-cols-${cols} gap-3`}>
        {data.map((data) => (
          <Input data={data} class={data.colSpan === undefined ? "" : `col-span-${data.colSpan}`} />
        ))}
      </div>
    );
  }

  const { id, type, name, required } = data;
  return (
    <div class={`flex gap-2 flex-wrap md:flex-nowrap ${className}`} title={name}>
      <label for={id} class={styles.label}>
        <p class="truncate text-ellipsis">{name}:</p>
      </label>

      {<GetInput id={id} type={type} required={required} class="border-b-2 border-b-black" />}
    </div>
  );
}

export default function NuevoPaciente() {
  return (
    <form method="POST" class="flex flex-col items-center mt-4">
      <div class="w-full flex flex-col gap-3">
        {DATA.map((data) => (
          <Input data={data} />
        ))}
      </div>

      <div>
        <Button type="submit" class="mt-8" color="green">
          <Typography variant="h6">Guardar</Typography>
        </Button>
      </div>
    </form>
  );
}
