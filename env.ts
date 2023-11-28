import checkMasterPassword from "./utils/checkMasterPassword.ts";

export const MASTER_TOKEN = Deno.env.get("MASTER_TOKEN")!;
if (!MASTER_TOKEN) throw new Error("MASTER_TOKEN is not defined");

// Set the APP_KEY environment variable to the master token
Deno.env.set("APP_KEY", MASTER_TOKEN);

export const IS_PRODUCTION = Boolean(Deno.env.get("DENO_DEPLOYMENT_ID"));

setTimeout(checkMasterPassword, 100);
