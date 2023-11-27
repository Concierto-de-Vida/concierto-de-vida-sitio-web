import { hash } from "bcrypt";
import db from "./data/database.ts";
import { loadSync } from "$std/dotenv/mod.ts";
import { isTokenValid } from "./data/controllers/tokensController.ts";

const env = loadSync({ examplePath: "./.example.env" });

/** Hashed token */
export const MASTER_TOKEN = await hash(env.MASTER_TOKEN);
Deno.env.set("APP_KEY", MASTER_TOKEN);

// Add the token to the database if it doesn't exist
if (!(await isTokenValid(env.MASTER_TOKEN))) {
  console.log("Creating master token...");
  await db.tokens.add({ token: MASTER_TOKEN, isAdmin: true, createdAt: new Date(), label: "Administrador" });
}

export const IS_PRODUCTION = Boolean(Deno.env.get("DENO_DEPLOYMENT_ID"));
