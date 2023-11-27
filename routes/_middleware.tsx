import State from "../types/state.type.ts";
import redirect from "../utils/redirect.ts";
import { kvSession } from "fresh-session/mod.ts";
import isAdminPage from "../utils/isAdminPage.ts";
import { Middleware } from "$fresh/src/server/types.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import isFreshOrStaticPage from "../utils/isFreshOrStatic.ts";
import { getToken } from "../data/controllers/tokensController.ts";

export const { handler }: Middleware<State> = {
  handler: [
    // implement fresh-session
    (req, ctx) =>
      kvSession(null, {
        secure: true,
        httpOnly: true,
        sameSite: "Strict",
        maxAge: Number.MAX_SAFE_INTEGER,
      })(req, ctx as unknown as MiddlewareHandlerContext<Record<string, unknown>>),

    // load state from session
    (_, ctx) => {
      ctx.state.token = ctx.state.session.get("token");
      return ctx.next();
    },

    // default state
    (_, ctx) => {
      ctx.state.label = null;
      ctx.state.isAdmin = false;
      return ctx.next();
    },

    // check if the user is logged in and get his data
    async (_, ctx) => {
      if (!ctx.state.token) return ctx.next();

      const token = await getToken(ctx.state.token);

      if (token) {
        ctx.state.label = token.label;
        ctx.state.isAdmin = token.isAdmin;
      } else {
        ctx.state.session.clear();
        ctx.state.token = undefined;
      }

      return ctx.next();
    },

    // check if the user is trying to access a page he's not supposed to
    async (req, ctx) => {
      const url = new URL(req.url);
      if (url.pathname === "" || isFreshOrStaticPage(req.url)) return await ctx.next();

      // login page. Redirect to home if the user is already logged in or call next() otherwise
      if (url.pathname === "/login") return ctx.state.token ? redirect("/") : ctx.next();

      // logged-in pages. Redirect to login if the user is not logged in
      if (!ctx.state.token) return redirect("/login");

      // admin pages. Redirect to home if the user is not an admin
      if (!ctx.state.isAdmin && isAdminPage(req.url)) return redirect("/");

      return ctx.next();
    },
  ],
};
