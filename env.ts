import { loadSync } from "$std/dotenv/mod.ts";
import checkMasterPassword from "./utils/checkMasterPassword.ts";

const env = loadSync({ examplePath: "./.example.env" });

// Set the APP_KEY environment variable to the master token
Deno.env.set("APP_KEY", env.MASTER_TOKEN);

export const MASTER_TOKEN = env.MASTER_TOKEN;

export const IS_PRODUCTION = Boolean(Deno.env.get("DENO_DEPLOYMENT_ID"));

await checkMasterPassword();
