import State from "../types/state.type.ts";
import redirect from "../utils/redirect.ts";
import Button from "../components/Button.tsx";
import { PageProps, Handlers } from "$fresh/server.ts";
import Typography from "../components/Typography.tsx";
import { isTokenValid } from "../data/controllers/tokensController.ts";

interface LoginProps {
  lastAttemptStatus: false | undefined;
}

export const handler: Handlers<LoginProps, State> = {
  async POST(req, ctx) {
    const form = await req.formData();

    const authToken = form.get("authToken")?.toString();
    if (!authToken) return new Response("Missing auth token", { status: 401 });

    if (await isTokenValid(authToken)) {
      ctx.state.session.set("token", authToken);
      ctx.state.session.flash("lastAttemptStatus");
    } else {
      ctx.state.session.flash("lastAttemptStatus", false);
    }

    return redirect("/");
  },
  GET: (_, ctx) => ctx.render({ lastAttemptStatus: ctx.state.session.flash("lastAttemptStatus") }),
};

export default function Login({ data }: PageProps<LoginProps, State>) {
  return (
    <>
      <Typography variant="h4" class="text-2xl mb-5">
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

        {data.lastAttemptStatus === false && (
          <Typography class="text-red-500">El token de autenticación es inválido</Typography>
        )}

        <div class="mt-3 flex justify-center items-center">
          <Button class="mt-2 p-2" type="submit" color="green">
            Iniciar sesión
          </Button>
        </div>
      </form>
    </>
  );
}
