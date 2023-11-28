import db from "../../data/database.ts";
import FaEye from "react-icons/fa/FaEye.ts";
import Button from "../../components/Button.tsx";
import MdDownload from "react-icons/md/MdDownload.ts";
import Typography from "../../components/Typography.tsx";
import IoIosAddCircle from "react-icons/io/IoIosAddCircle.ts";

export default async function Pacientes() {
  const { result: patients } = await db.patients.getMany();

  return (
    <div class="flex flex-col gap-5">
      <Typography variant="h2">Pacientes</Typography>

      <div class="flex gap-3 items-end">
        <a href="/pacientes/nuevo">
          <Button class="flex items-center gap-2" color="green">
            <IoIosAddCircle size={20} />
            <Typography variant="lead">Nuevo paciente</Typography>
          </Button>
        </a>

        <a href="/pacientes/descargar" f-client-nav={false} title="Descargar todos los datos">
          <Button class="flex items-center gap-2" color="blue">
            <MdDownload size={20} />
          </Button>
        </a>

        <a href="/pacientes/descargar?preview" f-client-nav={false} title="Ver todos los datos">
          <Button class="flex items-center gap-2" color="blue">
            <FaEye size={20} />
          </Button>
        </a>
      </div>

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
