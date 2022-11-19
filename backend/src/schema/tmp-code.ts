import { z } from 'zod';
import { validationMessages as V } from '@/libs/validations';

/**
 * @desc console.log(new Date(0 * 1000));
 * → Thu Jan 01 1970 09:00:00 GMT+0900 (日本標準時)
 */
export const TmpCodeSchema = z
  .object({
    tmpCode: z.string().min(1, { message: V.min }),
    state: z.string().min(1, { message: V.min }),
  })
  .strict()
  .transform(async ({ tmpCode, state }) => ({
    tmpCode,
    state,
  }));

export type TmpCode = z.infer<typeof TmpCodeSchema>;
