import { Handlers } from "$fresh/server.ts";
import redirect from "../../utils/redirect.ts";
import { dbWithoutCheck } from "../../data/database.ts";

export const handler: Handlers<null> = {
  async GET() {
    await dbWithoutCheck.patients.deleteMany();
    return redirect("/pacientes");
  },
};
