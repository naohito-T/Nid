import { z } from 'zod';

export const HeaderScheme = z.object({
  Authorization: z.string().optional(),
});

export type HeaderType = z.infer<typeof HeaderScheme>;
