import { z } from "zod";

export type Token = z.infer<typeof TokenModel>;

const TokenModel = z.object({
  token: z.string(),
  createdAt: z.date(),
  isAdmin: z.boolean(),
  label: z.string().nullable(),
});

export default TokenModel;
