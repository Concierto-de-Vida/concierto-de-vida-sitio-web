import db from "../../data/database.ts";
import Button from "../../components/Button.tsx";
import Typography from "../../components/Typography.tsx";
import IoIosAddCircle from "react-icons/io/IoIosAddCircle.ts";

export default async function Pacientes() {
  const { result: patients } = await db.patients.getMany();

  return (
    <div class="flex flex-col gap-5">
      <Typography variant="h2" class="text-2xl font-bold">
        Pacientes
      </Typography>

      <a href="/pacientes/nuevo">
        <Button class="flex items-center gap-2" color="green">
          <IoIosAddCircle size={20} />
          <Typography variant="lead">Nuevo paciente</Typography>
        </Button>
      </a>

      <div f-client-nav={false} class="flex flex-col gap-2">
        {patients.map((paciente) => (
          <a
            href={`/pacientes/${paciente.id}`}
            class="flex items-center gap-2 p-2 rounded bg-gray-200 hover:bg-gray-300 hover:underline"
          >
            <p class="font-semibold">
              {paciente.value.firstName} {paciente.value.lastName}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
