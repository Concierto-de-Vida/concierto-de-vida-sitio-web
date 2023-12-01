import State from "../types/state.type.ts";
import FaKey from "react-icons/fa/FaKey.ts";
import { PageProps } from "$fresh/server.ts";
import Button from "../components/Button.tsx";
import Typography from "../components/Typography.tsx";
import BsPeopleFill from "react-icons/bs/BsPeopleFill.ts";
import IoIosAddCircle from "react-icons/io/IoIosAddCircle.ts";

export default function Home({ state }: PageProps<undefined, State>) {
  return (
    <>
      <Typography variant="h1" class="text-center">
        Concierto de Vida
      </Typography>

      <div class="flex flex-col gap-4 mt-8">
        <a href="/pacientes/nuevo">
          <Button class="flex items-center gap-2" color="green">
            <IoIosAddCircle size={32} />
            <Typography variant="h4">Nuevo paciente</Typography>
          </Button>
        </a>

        <a href="/pacientes">
          <Button class="flex items-center gap-2" color="blue">
            <BsPeopleFill size={32} />
            <Typography variant="h4">Pacientes</Typography>
          </Button>
        </a>

        {state.isAdmin && (
          <a href="/credentials">
            <Button class="flex items-center gap-2" color="red">
              <FaKey size={28} />
              <Typography variant="h4">Credenciales</Typography>
            </Button>
          </a>
        )}
      </div>
    </>
  );
}
