import { hash } from "bcrypt";
import State from "../types/state.type.ts";
import { Handlers } from "$fresh/server.ts";
import redirect from "../utils/redirect.ts";
import Button from "../components/Button.tsx";
import Typography from "../components/Typography.tsx";
import { isTokenValid } from "../data/controllers/tokensController.ts";

export const handler: Handlers<null, State> = {
  async POST(req, ctx) {
    const form = await req.formData();

    const authToken = form.get("authToken")?.toString();
    if (!authToken) return new Response("Missing auth token", { status: 401 });
    if (!(await isTokenValid(authToken))) return new Response("Unauthorized", { status: 401 });

    ctx.state.session.set("token", authToken);

    return redirect("/");
  },
};

export default function Login() {
  return (
    <>
      <Typography variant="h4" class="text-2xl">
        Iniciar sesión
      </Typography>

      <form method="post">
        <div class="flex flex-col">
          <input
            required
            autoFocus
            type="password"
            name="authToken"
            placeholder="Token de autenticación"
            class="mt-2 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div class="mt-3 flex justify-center items-center">
          <Button class="mt-2 p-2" type="submit" color="green">
            Iniciar sesión
          </Button>
        </div>
      </form>
    </>
  );
}
