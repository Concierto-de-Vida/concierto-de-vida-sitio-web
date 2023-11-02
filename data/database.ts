import TokenModel from "./models/Token.ts";
import PatientModel from "./models/Patient.ts";
import { kvdex, indexableCollection, model } from "kvdex";

const kv = await Deno.openKv();

const db = kvdex(kv, {
  tokens: indexableCollection(TokenModel, {
    indices: {
      token: "primary", // unique
    },
  }),
  patients: indexableCollection(PatientModel, {
    indices: {},
  }),
});

export const dbWithoutCheck = kvdex(kv, {
  tokens: indexableCollection(model(), { indices: {} }),
  patients: indexableCollection(model(), { indices: {} }),
});

export default db;
