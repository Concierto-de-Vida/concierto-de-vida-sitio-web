import { hash } from "bcrypt";
import db from "./data/database.ts";
import { loadSync } from "$std/dotenv/mod.ts";
import { isTokenValid } from "./data/controllers/tokensController.ts";

const env = loadSync({ examplePath: "./.example.env" });

// Set the APP_KEY environment variable to the master token
Deno.env.set("APP_KEY", env.MASTER_TOKEN);

/** Hashed token */
export const MASTER_TOKEN = await hash(env.MASTER_TOKEN);

// Uncomment this to delete all the tokens in the database
// await db.tokens.deleteMany();

// Add the token to the database if it doesn't exist
if (!(await isTokenValid(env.MASTER_TOKEN, true))) {
  console.log("Creating master token...");
  await db.tokens.add({ token: env.MASTER_TOKEN, isAdmin: true, createdAt: new Date(), label: "Administrador" });
}

export const IS_PRODUCTION = Boolean(Deno.env.get("DENO_DEPLOYMENT_ID"));
