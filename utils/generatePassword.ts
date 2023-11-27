import { customAlphabet } from "nanoid/async.ts";

const groups = ["0123456789", "abcdefghijkmnopqrstuvwxyz", "#+"];
const nanoid = (size: number) => customAlphabet(groups.join(""), size);

const generators: Map<number, () => string> = new Map();

export default async function generatePassword(size = 12) {
  const generator = generators.get(size) || (await nanoid(size));
  if (!generators.has(size)) generators.set(size, generator);

  thisWhile: while (true) {
    const password = generator();
    // check the password has at least one character from each group
    for (const group of groups) {
      const hasGroup = group.split("").some((char) => password.includes(char));
      if (!hasGroup) continue thisWhile;
    }

    return password;
  }
}
