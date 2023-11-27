import db from "../database.ts";
import { compare, hash } from "bcrypt";

/** @param token Unhashed token */
export async function getToken(token: string) {
  const a = await db.tokens.findByPrimaryIndex("token", token);
  return a ? a.flat() : null;
}

export async function createToken(token: string, label: string | null) {
  await db.tokens.add({ token, isAdmin: false, createdAt: new Date(), label });
}

/** @param token Unhashed token */
export async function isTokenValid(token: string) {
  const { result: tokens } = await db.tokens.getMany();

  let isValid = false;

  // this compares the token with all the tokens in the database, to avoid
  // timing attacks
  await Promise.all(
    tokens.map(async (t) => {
      if (await compare(token, await hash(t.value.token))) isValid = true;
    })
  );

  return isValid;
}
