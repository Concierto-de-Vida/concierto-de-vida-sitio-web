import moment from "moment";
import { JSX } from "preact";
import db from "../../data/database.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import redirect from "../../utils/redirect.ts";
import Button from "../../components/Button.tsx";
import DataInput from "../../types/DataInput.tsx";
import Typography from "../../components/Typography.tsx";
import Input from "../../components/pacientes/Input.tsx";
import { Patient, castPatientValue } from "../../data/models/Patient.ts";

const DATA: (DataInput | DataInput[])[] = [
  {
    id: "createdAt",
    type: "date",
    name: "Fecha de registro",
    required: true,
    onlyDate: true,
  },
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
    id: "email",
    type: "text",
    name: "Correo electrónico",
    required: true,
  },
  {
    id: "birthdate",
    type: "date",
    name: "Fecha de nacimiento",
    required: true,
    onlyDate: true,
  },
  {
    id: "gender",
    type: "radio",
    name: "Género",
    required: true,
    options: [
      {
        id: "male",
        name: "Masculino",
      },
      {
        id: "female",
        name: "Femenino",
      },
      {
        id: "other",
        name: "Otro",
      },
    ],
  },
];

export const handler: Handlers<NuevoPacienteProps | { message: string }> = {
  async GET(_, ctx) {
    if (ctx.params.id === "nuevo") return await ctx.render({});

    const patient = await db.patients.find(ctx.params.id);
    if (!patient?.value) return ctx.renderNotFound({ message: `Paciente no encontrado` });

    return ctx.render({ patient: patient.value });
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const newPatient = {} as Patient;

    const formEntries = Object.fromEntries(form.entries());

    console.log(formEntries);

    for (const data of DATA.flat()) {
      const value = formEntries[data.id];
      if (value === undefined && data.type !== "date") {
        if (data.required) return ctx.renderNotFound({ message: `Missing required field: ${data.id}` });
        else continue;
      }

      if (data.type === "date") {
        const offset = +formEntries["offset"];
        if (isNaN(offset)) return ctx.renderNotFound({ message: `Missing required field: offset` });

        const date = moment().utcOffset(offset).startOf("day");

        const keys = data.onlyDate
          ? (["year", "month", "date"] as const)
          : (["year", "month", "date", "hours", "minutes", "seconds"] as const);

        for (const key of keys) {
          const value = +formEntries[`${data.id}&${key}`];
          if (isNaN(value)) return ctx.renderNotFound({ message: `Missing required field: ${data.id}&${key}` });
          date[key](value);
        }

        castPatientValue(data.id, date.valueOf(), newPatient);
      } else {
        castPatientValue(data.id, value, newPatient);
      }
    }

    if (ctx.params.id === "nuevo") {
      await db.patients.add(newPatient);
    } else {
      await db.patients.write(ctx.params.id, newPatient);
    }

    return redirect("/pacientes");
  },
};

interface NuevoPacienteProps {
  patient?: Patient;
}

export default function NuevoPaciente({ data }: PageProps<NuevoPacienteProps>) {
  const { patient } = data;

  const inputs: JSX.Element[] = [];
  for (const data of DATA) {
    const key = Array.isArray(data) ? data.map((d) => d.id).join("") : data.id;
    inputs.push(<Input data={data} patient={patient} key={key} />);
  }

  return (
    <form method="POST" class="flex flex-col items-center mt-4">
      <div class="w-full flex flex-col gap-6">{inputs}</div>

      <div>
        <Button type="submit" class="mt-8" color="green">
          <Typography variant="h6">Guardar</Typography>
        </Button>
      </div>
    </form>
  );
}
