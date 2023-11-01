import { Head } from "$fresh/runtime.ts";
import { UnknownPageProps } from "$fresh/server.ts";
import Typography from "../components/Typography.tsx";

interface Error404Props {
  message?: string;
}

export default function Error404({ data }: UnknownPageProps<Error404Props>) {
  return (
    <>
      <Head>
        <title>404 - Página no encontrada</title>
      </Head>
      <div class="px-4 py-8 mx-auto">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <Typography variant="h2">404 - Página no encontrada</Typography>
          <p class="my-4">La página que buscas no ha sido encontrada.</p>
          <a href="/" class="underline">
            Ir a la página principal
          </a>

          {data?.message && (
            <p class="mt-4">
              <code>{data.message}</code>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
