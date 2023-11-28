import { Document } from "kvdex";
import db from "../data/database.ts";
import { FiTrash2 } from "react-icons/fi";
import State from "../types/state.type.ts";
import redirect from "../utils/redirect.ts";
import Button from "../components/Button.tsx";
import { Token } from "../data/models/Token.ts";
import GetInput from "../components/GetInput.tsx";
import { AppProps, Handlers } from "$fresh/server.ts";
import { createToken } from "../data/controllers/tokensController.ts";
import Typography, { getTypographyClass } from "../components/Typography.tsx";

const styles = {
  th: "px-4 py-2 border",
  td: "border px-4 py-2",
  label:
    `whitespace-nowrap flex items-top gap-2 max-w-full md:max-w-[40%] font-semibold md:mb-[-3px] ` +
    `${getTypographyClass("p")}`,
};

interface CredentialsProps {
  tokens: Document<Token>[];
}

export const handler: Handlers<CredentialsProps, State> = {
  async POST(req) {
    const form = await req.formData();

    const deleteId = form.get("delete")?.toString();
    const label = form.get("label")?.toString();
    if (!label && !deleteId) return new Response("Falta información", { status: 401 });

    if (label) await createToken(label);
    if (deleteId) {
      const token = await db.tokens.find(deleteId);
      if (token && !token?.value.isAdmin) await db.tokens.delete(deleteId);
    }

    return redirect("/credentials");
  },
  GET: async (_, ctx) => ctx.render({ tokens: (await db.tokens.getMany()).result }),
};

export default function Credentials({ data, state }: AppProps<CredentialsProps, State>) {
  const { tokens } = data;

  tokens.sort((a, b) => b.value.createdAt.valueOf() - a.value.createdAt.valueOf());
  if (tokens.length >= 2) tokens.unshift(tokens.pop()!);

  return (
    <div class="flex flex-col gap-10 mb-7">
      <Typography variant="h2">Credenciales</Typography>

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

      <form method="post" class="overflow-x-auto">
        <table class="table-auto w-full border-collapse border">
          <thead>
            <tr>
              <th class={styles.th}>Nombre</th>
              <th class={styles.th}>Token</th>
              <th class={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token) => (
              <tr>
                <td class={styles.td}>{token.value.label}</td>
                <td class={styles.td}>
                  <code>{token.value.token}</code>
                </td>
                <td class={styles.td}>
                  {state.token !== token.value.token && (
                    <Button type="submit" color="red" name="delete" value={token.id.toString()}>
                      <FiTrash2 />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}
