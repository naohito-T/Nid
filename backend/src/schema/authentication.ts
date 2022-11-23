import { z } from 'zod';
import { ICommonSchema } from './_common';

export const AuthenticationSchema = ICommonSchema.extend({
  identityType: z.number().optional(),
  identifier: z.number().optional(),
  password: z.string().min(1),
  credential: z.number().optional(),
})
  .strict()
  .transform(
    async ({ id, createdAt, updatedAt, identityType, identifier, password, credential }) => ({
      id,
      createdAt,
      updatedAt,
      identityType,
      identifier,
      password,
      credential,
    }),
  );

export type Authentication = z.infer<typeof AuthenticationSchema>;
