import { lodash } from "lodash";

const emptySession = { data: {}, _flash: {} };
const a = await Deno.openKv();

export default async function deleteUnusedSessions() {
  const entries = a.list({ prefix: ["fresh-session"] });
  for await (const entry of entries) {
    if (lodash.isEqual(entry.value, emptySession)) {
      await a.delete(entry.key);
    }
  }
}
