import db from "../data/database.ts";
import State from "../types/state.type.ts";
import { Handlers } from "$fresh/server.ts";
import redirect from "../utils/redirect.ts";
import Button from "../components/Button.tsx";
import GetInput from "../components/GetInput.tsx";
import { createToken } from "../data/controllers/tokensController.ts";
import Typography, { getTypographyClass } from "../components/Typography.tsx";

const styles = {
  th: "px-4 py-2 border",
  td: "border px-4 py-2",
  label:
    `whitespace-nowrap flex items-top gap-2 max-w-full md:max-w-[40%] font-semibold md:mb-[-3px] ` +
    `${getTypographyClass("p")}`,
};

export const handler: Handlers<null, State> = {
  async POST(req) {
    const form = await req.formData();

    const label = form.get("label")?.toString();
    if (!label) return new Response("Missing label", { status: 401 });

    await createToken(label);

    return redirect("/credentials");
  },
};

export default async function Credentials() {
  const { result: tokens } = await db.tokens.getMany();

  tokens.sort((a, b) => b.value.createdAt.valueOf() - a.value.createdAt.valueOf());
  if (tokens.length >= 2) tokens.unshift(tokens.pop()!);

  return (
    <div class="flex flex-col gap-10">
      <Typography variant="h1">Credenciales</Typography>

      <form method="post" class="flex gap-2 flex-col md:flex-row">
        <label class="flex gap-0 md:gap-2 flex-wrap md:flex-nowrap w-full" title="Nombre (requerido)">
          <div class={styles.label}>
            <p class="truncate text-ellipsis font-semibold select-none">Nombre</p>
          </div>
          <GetInput
            required
            id="label"
            type="text"
            class="border-b-2 border-b-gray-400 h-[fit-content]"
            placeholder="El nombre identificador de este nuevo token"
          />
        </label>
        <div class="w-full md:w-auto flex justify-center">
          <Button class="p-2 whitespace-nowrap" type="submit" color="green">
            Nuevo token
          </Button>
        </div>
      </form>

      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class={styles.th}>Nombre</th>
            <th class={styles.th}>Token</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr>
              <td class={styles.td}>{token.value.label}</td>
              <td class={styles.td}>
                <code>{token.value.token}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
