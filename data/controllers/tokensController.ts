import db from "../database.ts";
import { compare, hash } from "bcrypt";
import generatePassword from "../../utils/generatePassword.ts";

/** @param token Unhashed token */
export async function getToken(token: string) {
  const a = await db.tokens.findByPrimaryIndex("token", token);
  return a ? a.flat() : null;
}

export async function createToken(label: string | null) {
  return db.tokens.add({ token: await generatePassword(), isAdmin: false, createdAt: new Date(), label });
}

/** @param token Unhashed token */
export async function isTokenValid(token: string, isAdminToo = false) {
  const { result: tokens } = await db.tokens.getMany();

  let isValid = false;

  // this compares the token with all the tokens in the database, to avoid
  // timing attacks
  await Promise.all(
    tokens.map(async (t) => {
      if ((await compare(token, await hash(t.value.token))) && (isAdminToo ? t.value.isAdmin : true))
        isValid = true;
    })
  );

  return isValid;
}
