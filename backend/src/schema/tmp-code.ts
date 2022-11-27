import { z } from 'zod';

/**
 * @desc console.log(new Date(0 * 1000));
 * → Thu Jan 01 1970 09:00:00 GMT+0900 (日本標準時)
 */
export const TmpCodeSchema = z
  .object({
    tmpCode: z.string().min(1),
    state: z.string().min(1),
  })
  .strict()
  .transform(async ({ tmpCode, state }) => ({
    tmpCode,
    state,
  }));

export type TmpCode = z.infer<typeof TmpCodeSchema>;
