import moment from "moment";
import { JSX } from "preact";
import db from "../../data/database.ts";
import { CITIES } from "../../types/City.ts";
import redirect from "../../utils/redirect.ts";
import Button from "../../components/Button.tsx";
import DataInput from "../../types/DataInput.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Autocomplete from "../../types/Autocomplete.ts";
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
      name: "Nombre",
      required: true,
      autocomplete: Autocomplete.GIVEN_NAME,
    },
    {
      id: "lastName",
      type: "text",
      name: "Apellidos",
      required: true,
      autocomplete: Autocomplete.FAMILY_NAME,
    },
  ],
  [
    {
      id: "email",
      type: "text",
      name: "Correo electrónico",
      required: true,
      autocomplete: Autocomplete.EMAIL,
      pattern: "[^@]+@[^\\.]+\\..+",
    },
    {
      id: "phone",
      type: "text",
      name: "Teléfono",
      required: true,
      autocomplete: Autocomplete.TEL,
      array: true,
    },
  ],
  {
    id: "birthdate",
    type: "date",
    name: "Fecha de nacimiento",
    required: true,
    onlyDate: true,
    autocomplete: {
      date: Autocomplete.BDAY_DAY,
      year: Autocomplete.BDAY_YEAR,
      month: Autocomplete.BDAY_MONTH,
    },
  },
  {
    id: "gender",
    type: "radio",
    name: "Género",
    required: true,
    options: [
      { id: "male", name: "Masculino" },
      { id: "female", name: "Femenino" },
      { id: "other", name: "Otro" },
    ],
  },
  [
    {
      id: "civilStatus",
      type: "dropdown",
      name: "Estado civil",
      required: true,
      options: [
        { id: "single", name: "Soltero(a)" },
        { id: "married", name: "Casado(a)" },
        { id: "union", name: "Unión de hecho" },
        { id: "divorced", name: "Divorciado(a)" },
        { id: "separated", name: "Separado(a)" },
        { id: "widowed", name: "Viudo(a)" },
        { id: "other", name: "Otro" },
      ],
    },
    {
      id: "educationLevel",
      type: "dropdown",
      name: "Nivel de escolaridad",
      required: true,
      options: [
        { id: "preschool", name: "Preescolar" },
        { id: "primary", name: "Primaria" },
        { id: "secondary", name: "Secundaria" },
        { id: "highSchool", name: "Preparatoria o Bachillerato" },
        { id: "technical", name: "Técnico o Comercial" },
        { id: "bachelor", name: "Licenciatura" },
        { id: "master", name: "Maestría" },
        { id: "doctorate", name: "Doctorado" },
        { id: "none", name: "Sin escolaridad" },
      ],
    },
  ],
  [
    {
      id: "streetAddress",
      type: "text",
      name: "Dirección calle",
      required: true,
      colSpan: 4,
    },
    {
      id: "neighborhood",
      type: "text",
      name: "Colonia",
      required: true,
      colSpan: 3,
    },
    {
      id: "streetAddressNumber",
      type: "text",
      name: "Número",
      required: true,
      colSpan: 2,
    },
  ],
  [
    {
      id: "city",
      type: "dropdown",
      name: "Ciudad",
      required: true,
      options: CITIES.map((city) => ({ id: city, name: city })),
    },
    {
      id: "municipality",
      type: "text",
      name: "Municipio",
      required: true,
    },
  ],
  [
    {
      id: "medicalService",
      type: "text",
      name: "Servicio médico",
    },
    {
      id: "doctorTreating",
      type: "text",
      name: "Médico tratante",
    },
  ],
  {
    id: "diagnosisDate",
    type: "date",
    name: "Fecha de diagnóstico",
    onlyDate: true,
  },
  {
    id: "treatment",
    type: "text",
    name: "Tratamiento utilizado",
  },
  {
    id: "treatmentFrequency",
    type: "text",
    name: "Cada cuánto tiempo es indicado el tratamiento",
  },
  {
    id: "currentMedication",
    type: "text",
    name: "Medicamento actual",
    array: true,
  },
  {
    id: "hospitalization",
    type: "text",
    name: "Internamiento con",
  },
  [
    {
      id: "familyWithEM",
      type: "radio",
      name: "Familiar con E.M.",
      options: [
        { id: "yes", name: "Sí" },
        { id: "no", name: "No", defaultSelected: true },
      ],
      colSpan: 6,
    },
    {
      id: "familyWithEMRelationship",
      type: "text",
      name: "Parentezco",
      array: true,
      colSpan: 9,
    },
  ],
  {
    id: "relapses",
    type: "number",
    name: "Número de recaidas",
  },
  {
    id: "lastRelapse",
    type: "date",
    name: "Última recaida",
    onlyDate: true,
  },
  {
    id: "disabilityScale",
    type: "dropdown",
    name: "Grado de escala de discapacidad",
    options: [
      { id: "0", name: "0 Inicial" },
      { id: "1", name: "1 Inicial" },
      { id: "2", name: "2 Remitente Recurrente" },
      { id: "3", name: "3 Remitente Recurrente" },
      { id: "4", name: "4 Remitente Recurrente" },
      { id: "5", name: "5 Secundaria Progresiva" },
      { id: "6", name: "6 Secundaria Progresiva" },
      { id: "7", name: "7 Secundaria Progresiva" },
      { id: "8", name: "8 Secundaria Progresiva" },
      { id: "9", name: "9 Primaria Progresiva" },
      { id: "10", name: "10 Primaria Progresiva" },
    ],
  },
  {
    id: "usesAid",
    type: "radio",
    name: "¿Usa aparato/s de ayuda?",
    required: true,
    options: [
      { id: "yes", name: "Sí" },
      { id: "no", name: "No" },
    ],
  },
  {
    id: "aid",
    type: "text",
    name: "¿Cuál/es?",
    array: true,
  },
  {
    id: "bladderControl",
    type: "radio",
    name: "¿Control de esfínteres?",
    options: [
      { id: "yes", name: "Sí" },
      { id: "no", name: "No" },
    ],
    required: true,
  },
  {
    id: "needsHelp",
    type: "radio",
    name: "¿Necesita ayuda para actividades diarias?",
    required: true,
    options: [
      { id: "yes", name: "Sí" },
      { id: "no", name: "No" },
    ],
  },
  {
    id: "helpActivities",
    type: "text",
    name: "¿Qué actividades?",
    array: true,
  },
  {
    id: "helpActivitiesTime",
    type: "text",
    name: "¿Cuánto tiempo le dedica?",
  },
  {
    id: "caregivers",
    name: "Cuidadores",
    type: "radio",
    required: true,
    options: [
      { id: "yes", name: "Sí" },
      { id: "no", name: "No" },
    ],
  },
  [
    {
      id: "caregiverName",
      type: "text",
      name: "Nombre",
      array: true,
    },
    {
      id: "caregiverRelationship",
      type: "text",
      name: "Parentezco",
      array: true,
    },
  ],
  {
    id: "otherMedications",
    name: "Otros medicamentos",
    type: "radio",
    required: true,
    options: [
      { id: "yes", name: "Sí" },
      { id: "no", name: "No" },
    ],
  },
  [
    {
      id: "otherMedicationName",
      type: "text",
      name: "Nombre",
      array: true,
    },
    {
      id: "otherMedicationFor",
      type: "text",
      name: "Para padecimiento",
      array: true,
    },
  ],
  {
    id: "allergies",
    name: "Reacciones alérgicas",
    type: "text",
    array: true,
  },
  {
    id: "additionalComments",
    name: "Comentarios adicionales",
    type: "text",
    array: true,
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

    for (const data of DATA.flat()) {
      const value = formEntries[data.id];

      const isValueAnArray = "array" in data && data.array;
      const isValueNotDirectlyInForm = data.type === "date" || isValueAnArray;

      if (value === undefined && !isValueNotDirectlyInForm) {
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
      }
      //
      else if (isValueAnArray) {
        const values: string[] = [];
        for (const key in formEntries)
          if (key.startsWith(`${data.id}&`) && formEntries[key].toString() !== "")
            values.push(formEntries[key].toString());
        castPatientValue(data.id, values, newPatient);
      }
      //
      else castPatientValue(data.id, value, newPatient);
    }

    console.log(newPatient);

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
    <form method="POST" class="flex flex-col items-center mt-4 mb-16">
      <div class="w-full flex flex-col gap-6">{inputs}</div>

      <div>
        <Button type="submit" class="mt-8" color="green">
          <Typography variant="h6">Guardar</Typography>
        </Button>
      </div>
    </form>
  );
}
