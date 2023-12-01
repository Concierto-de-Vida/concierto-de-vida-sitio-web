import moment from "moment";
import db from "../../data/database.ts";
import { TIMEZONE } from "../../env.ts";
import State from "../../types/state.type.ts";
import { stringify, parse } from "$std/csv/mod.ts";
import AsciiTable, { AsciiAlign } from "ascii_table";
import { Patient } from "../../data/models/Patient.ts";
import { translateGender } from "../../types/Genders.ts";
import { translateCivilStatus } from "../../types/CivilStatus.ts";
import { PageProps, Handlers, RouteConfig } from "$fresh/server.ts";
import { translateBooleanAnswer } from "../../types/BooleanAnswer.ts";
import { translateEducationLevel } from "../../types/EducationLevel.ts";

export const config: RouteConfig = { skipAppWrapper: true };

interface DescargarProps {
  csv: string;
}

function isTouple(value: string[]): value is [string, ...string[]] {
  return Array.isArray(value) && value.length > 1;
}

const columns: { prop: keyof Patient; header: string }[] = [
  { prop: "firstName", header: "Nombre" },
  { prop: "lastName", header: "Apellido" },
  { prop: "birthdate", header: "Fecha de nacimiento" },
  { prop: "createdAt", header: "Fecha de registro" },
  { prop: "email", header: "Correo electrónico" },
  { prop: "phone", header: "Teléfono" },
  { prop: "gender", header: "Género" },
  { prop: "civilStatus", header: "Estado civil" },
  { prop: "educationLevel", header: "Nivel educativo" },
  { prop: "streetAddress", header: "Dirección" },
  { prop: "streetAddressNumber", header: "Número de dirección" },
  { prop: "neighborhood", header: "Barrio" },
  { prop: "city", header: "Ciudad" },
  { prop: "municipality", header: "Municipio" },
  { prop: "medicalService", header: "Servicio médico" },
  { prop: "doctorTreating", header: "Doctor tratante" },
  { prop: "diagnosisDate", header: "Fecha de diagnóstico" },
  { prop: "treatment", header: "Tratamiento" },
  { prop: "currentMedication", header: "Medicación actual" },
  { prop: "treatmentFrequency", header: "Frecuencia de tratamiento" },
  { prop: "hospitalization", header: "Hospitalización" },
  { prop: "familyWithEM", header: "Familiar con EM" },
  { prop: "familyWithEMRelationship", header: "Parentesco con familiar con EM" },
  { prop: "relapses", header: "Recaídas" },
  { prop: "lastRelapse", header: "Última recaída" },
  { prop: "disabilityScale", header: "Escala de discapacidad" },
  { prop: "usesAid", header: "Usa ayuda" },
  { prop: "aid", header: "Ayuda" },
  { prop: "bladderControl", header: "Control de vejiga" },
  { prop: "needsHelp", header: "Necesita ayuda" },
  { prop: "helpActivities", header: "Actividades que necesita ayuda" },
  { prop: "helpActivitiesTime", header: "Tiempo que necesita ayuda" },
  { prop: "caregivers", header: "Cuidadores" },
  { prop: "caregiverName", header: "Nombre del cuidador" },
  { prop: "caregiverRelationship", header: "Parentesco del cuidador" },
  { prop: "otherMedications", header: "Otras medicaciones" },
  { prop: "otherMedicationName", header: "Nombre de la otra medicación" },
  { prop: "otherMedicationFor", header: "Para qué es la otra medicación" },
  { prop: "allergies", header: "Alergias" },
  { prop: "additionalComments", header: "Comentarios adicionales" },
];
const columnNames: string[] = columns.map((c) => c.header);
const columnProps: (keyof Patient)[] = columns.map((c) => c.prop);

const translators = {
  gender: translateGender,
  civilStatus: translateCivilStatus,
  educationLevel: translateEducationLevel,
  familyWithEM: translateBooleanAnswer,
  usesAid: translateBooleanAnswer,
  bladderControl: translateBooleanAnswer,
  needsHelp: translateBooleanAnswer,
  caregivers: translateBooleanAnswer,
  otherMedications: translateBooleanAnswer,
};

function normalize(patient: Patient): Record<keyof Patient, string> {
  const patientCopy = {} as Record<keyof Patient, string>;
  for (const column of columnProps) {
    switch (column) {
      case "birthdate":
      case "createdAt":
      case "lastRelapse":
      case "diagnosisDate":
        patientCopy[column] = moment(patientCopy[column]).tz(TIMEZONE).format("YYYY-MM-DD");
        break;

      case "relapses":
        patientCopy[column] = patient[column]?.toString() || "";
        break;

      case "aid":
      case "phone":
      case "allergies":
      case "caregiverName":
      case "helpActivities":
      case "currentMedication":
      case "otherMedicationFor":
      case "additionalComments":
      case "otherMedicationName":
      case "caregiverRelationship":
      case "familyWithEMRelationship":
        patientCopy[column] = patient[column]?.join(", ") || "";
        break;

      case "gender":
        patientCopy[column] = translators[column](patient[column] || "");
        break;
      case "civilStatus":
        patientCopy[column] = translators[column](patient[column] || "");
        break;
      case "educationLevel":
        patientCopy[column] = translators[column](patient[column] || "");
        break;
      case "familyWithEM":
      case "usesAid":
      case "bladderControl":
      case "needsHelp":
      case "caregivers":
      case "otherMedications":
        patientCopy[column] = translators[column](patient[column] || "");
        break;

      default:
        patientCopy[column] = patient[column] || "";
    }
  }

  return patientCopy;
}

export const handler: Handlers<DescargarProps, State> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const preview = typeof url.searchParams.get("preview") === "string";

    const { result: patients } = await db.patients.getMany();
    patients.sort((a, b) => a.value.createdAt - b.value.createdAt);

    const csv = stringify(
      patients.map((p) => normalize(p.value)),
      { columns: columns }
    );

    const filename = `patients-${moment().format("YYYY-MM-DD")}.csv`;

    const response = preview
      ? ctx.render({ csv })
      : new Response(csv, {
          headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": `attachment; filename=${filename}`,
          },
        });

    return response;
  },
};

export default function Descargar({ data }: PageProps<DescargarProps, State>) {
  if (!isTouple(columnNames)) return <p>Not enough columns</p>;

  const csvObject = parse(data.csv, {
    columns: columnNames,
    skipFirstRow: true,
  });

  const table = new AsciiTable();
  table.setHeadingAlign(AsciiAlign.CENTER).setHeading(...columnNames);

  for (const row of csvObject) {
    const values = columnNames.map((column) => row[column] || "");
    if (isTouple(values)) table.addRow(...values);
  }

  return (
    <div class="p-2 whitespace-nowrap">
      <code>
        {table
          .toString()
          .split("\n")
          .map((line) => (
            <p>{line.split("").map((c) => (c === " " ? <>&nbsp;</> : c))}</p>
          ))}
      </code>
    </div>
  );
}
