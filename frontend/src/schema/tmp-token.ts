import { z } from 'zod';

/**
 * @desc 一時トークン
 */
export const TmpTokenScheme = z.object({
  tmpToken: z.string().max(50, { message: 'Incorrect token.' }),
  state: z.string().max(50, { message: 'Incorrect token.' }),
});

export type TmpToken = z.infer<typeof TmpTokenScheme>;
