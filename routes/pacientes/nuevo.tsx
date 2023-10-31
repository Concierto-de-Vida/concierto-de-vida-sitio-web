import db from "../../data/database.ts";
import { Handlers } from "$fresh/server.ts";
import redirect from "../../utils/redirect.ts";
import Button from "../../components/Button.tsx";
import DataInput from "../../types/DataInput.tsx";
import GetInput from "../../components/GetInput.tsx";
import { Patient } from "../../data/models/Patient.ts";
import Typography, { getTypographyClass } from "../../components/Typography.tsx";

const styles = {
  label: `whitespace-nowrap flex items-center gap-2 max-w-[40%] font-semibold ${getTypographyClass("p")}`,
};

const DATA: DataInput[] = [
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
];

export const handler: Handlers = {
  async GET(_, ctx) {
    return await ctx.render();
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const newPatient = {} as Patient;

    for (const data of DATA) {
      const value = form.get(data.id)?.toString();
      if (value === undefined && data.required) return ctx.renderNotFound();
      if (value !== undefined) newPatient[data.id] = value;
    }

    await db.patients.add(newPatient);

    return redirect("/pacientes");
  },
};

export default function NuevoPaciente() {
  return (
    <form method="POST" class="flex flex-col items-center mt-4">
      <div class="w-full flex flex-col gap-2">
        {DATA.map(({ id, type, name, required }) => (
          <div class={`flex gap-2 flex-wrap md:flex-nowrap`} title={name}>
            <label for={id} class={styles.label}>
              <p class="truncate text-ellipsis">{name}:</p>
            </label>

            {<GetInput id={id} type={type} required={required} class="border-b-2 border-b-black" />}
          </div>
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
