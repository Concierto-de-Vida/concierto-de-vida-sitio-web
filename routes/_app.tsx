import State from "../types/state.type.ts";
import { Partial } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import Navbar from "../components/Navbar.tsx";
import { Links } from "../components/Links.tsx";

const MAX_WIDTH = "max-w-screen-lg";

export default function App({ Component, data, state }: PageProps<undefined, State>) {
  const isLoggedIn = Boolean(state.token);

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Concierto de Vida</title>
        <Links />
      </head>
      <body f-client-nav class="min-h-screen flex flex-col">
        <Navbar loggedIn={isLoggedIn} />

        <Partial name="body">
          <div class={`px-4 pt-3 mx-auto w-full ${MAX_WIDTH} flex-1 h-full`}>
            <Component />
          </div>
        </Partial>
      </body>
    </html>
  );
}
