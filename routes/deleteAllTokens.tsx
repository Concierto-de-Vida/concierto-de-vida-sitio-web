import db from "../data/database.ts";
import State from "../types/state.type.ts";
import redirect from "../utils/redirect.ts";
import { Handlers } from "$fresh/server.ts";
import checkMasterPassword from "../utils/checkMasterPassword.ts";

export const handler: Handlers<undefined, State> = {
  async GET(_, ctx) {
    await db.tokens.deleteMany();
    await checkMasterPassword();
    return redirect("/");
  },
};
