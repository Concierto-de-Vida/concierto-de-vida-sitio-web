import { loadSync } from "$std/dotenv/mod.ts";
import checkMasterPassword from "./utils/checkMasterPassword.ts";

const env = loadSync({ examplePath: "./.example.env" });

export const MASTER_TOKEN = Deno.env.get("MASTER_TOKEN") || env.MASTER_TOKEN;
if (!MASTER_TOKEN) throw new Error("MASTER_TOKEN is not defined");

export const TIMEZONE = Deno.env.get("TIMEZONE") || env.TIMEZONE || "America/Monterrey";

// Set the APP_KEY environment variable to the master token
Deno.env.set("APP_KEY", MASTER_TOKEN);

export const IS_PRODUCTION = Boolean(Deno.env.get("DENO_DEPLOYMENT_ID"));

setTimeout(checkMasterPassword, 100);
