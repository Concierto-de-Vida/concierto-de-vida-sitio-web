import db from "../data/database.ts";
import { MASTER_TOKEN } from "../env.ts";
import { isTokenValid } from "../data/controllers/tokensController.ts";

export default async function checkMasterPassword() {
  // Add the token to the database if it doesn't exist
  if (!(await isTokenValid(MASTER_TOKEN, true))) {
    console.log("Creating master token...");
    await db.tokens.add({ token: MASTER_TOKEN, isAdmin: true, createdAt: new Date(), label: "Administrador" });
  }
}
