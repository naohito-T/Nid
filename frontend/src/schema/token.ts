import { z } from 'zod';

export const TokenScheme = z.object({
  token: z.string().max(50, { message: 'Incorrect token.' }),
});

export type TokenSchemeType = z.infer<typeof TokenScheme>;
