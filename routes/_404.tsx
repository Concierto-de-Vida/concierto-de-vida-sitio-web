import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Página no encontrada</title>
      </Head>
      <div class="px-4 py-8 mx-auto">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <h1 class="text-4xl font-bold">404 - Página no encontrada</h1>
          <p class="my-4">La página que buscas no ha sido encontrada.</p>
          <a href="/" class="underline">
            Ir a la página principal
          </a>
        </div>
      </div>
    </>
  );
}
