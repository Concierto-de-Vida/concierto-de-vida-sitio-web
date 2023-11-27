import db from "../database.ts";
import { compare, hash } from "bcrypt";

/** @param token Hashed token */
export async function getToken(token: string) {
  const a = await db.tokens.findByPrimaryIndex("token", token);
  return a ? a.flat() : null;
}

/** Creates a token, hashing the token and other data */
export async function createToken(token: string, label: string | null) {
  await db.tokens.add({ token: await hash(token), isAdmin: false, createdAt: new Date(), label });
}

/** @param token Unhashed token */
export async function isTokenValid(token: string) {
  const { result: tokens } = await db.tokens.getMany();

  let isValid = false;

  // this compares the token with all the tokens in the database, to avoid
  // timing attacks
  for (const t of tokens) if (await compare(token, t.value.token)) isValid = true;

  return isValid;
}
