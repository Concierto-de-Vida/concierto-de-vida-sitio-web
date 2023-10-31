import { Handlers } from "$fresh/server.ts";
import db from "../../data/database.ts";
import redirect from "../../utils/redirect.ts";

export const handler: Handlers<null> = {
  async GET() {
    await db.patients.deleteMany();
    return redirect("/pacientes");
  },
};
