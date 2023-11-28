import { hash as hashPromise, hashSync, compare as comparePromise, compareSync } from "bcrypt";

export const hash: typeof hashPromise = (plaintext: string, salt: string | undefined = undefined) =>
  new Promise((res) => res(hashSync(plaintext, salt)));

export const compare: typeof comparePromise = (plaintext: string, hash: string) =>
  new Promise((res) => res(compareSync(plaintext, hash)));
