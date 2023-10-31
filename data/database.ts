import TokenModel from "./models/Token.ts";
import PatientModel from "./models/Patient.ts";
import { kvdex, indexableCollection } from "kvdex";

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

export default db;
