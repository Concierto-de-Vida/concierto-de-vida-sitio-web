import State from "../types/state.type.ts";
import redirect from "../utils/redirect.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers<undefined, State> = {
  GET(_, ctx) {
    ctx.state.session.clear();
    return redirect("/login");
  },
};
