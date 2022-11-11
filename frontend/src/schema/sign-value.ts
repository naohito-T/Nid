import { z } from 'zod';

export const SingValueScheme = z.object({
  email: z.string().min(1, { message: 'Required' }).max(50),
  password: z.string().min(1, { message: 'Required' }).max(50),
});

export type SingValueType = z.infer<typeof SingValueScheme>;
