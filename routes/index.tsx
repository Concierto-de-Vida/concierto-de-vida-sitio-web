import Button from "../components/Button.tsx";
import Typography from "../components/Typography.tsx";
import IoIosAddCircle from "react-icons/io/IoIosAddCircle.ts";
import BsPeopleFill from "react-icons/bs/BsPeopleFill.ts";

export default function Home() {
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
      </div>
    </>
  );
}
