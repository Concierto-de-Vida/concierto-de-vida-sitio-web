import { AppProps } from "$fresh/server.ts";
import { Links } from "../components/Links.tsx";

const MAX_WIDTH = "max-w-screen-lg";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Concierto de Vida</title>
        <Links />
      </head>
      <body class="min-h-screen flex flex-col">
        <header class="flex justify-center sticky top-0 left-0 right-0 z-50 p-3 bg-gray-400">
          <div class={`flex justify-between items-center w-full ${MAX_WIDTH}`}>
            <a href="/">
              <h1 class="font-bold text-xl">Concierto de Vida</h1>
            </a>
            <div class="flex gap-5">
              <a class="hover:underline hidden" href="/programs">
                Programas
              </a>
            </div>
          </div>
        </header>

        <div class={`px-4 pt-3 mx-auto w-full ${MAX_WIDTH} flex-1 h-full`}>
          <Component />
        </div>
      </body>
    </html>
  );
}
