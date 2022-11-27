import { z } from 'zod';
import { ICommonSchema } from './_common';

/**
 * @desc console.log(new Date(0 * 1000));
 * → Thu Jan 01 1970 09:00:00 GMT+0900 (日本標準時)
 */
export const TermSchema = ICommonSchema.extend({
  termsVersion: z.date().min(new Date(0 * 1000)),
})
  .strict()
  .transform(async ({ id, createdAt, updatedAt, termsVersion }) => ({
    id,
    createdAt,
    updatedAt,
    // 管理画面からは日付がくる（UNIXタイムスタンプ）最小Thu Jan 01 1970 09:00:00 GMT+0900 (日本標準時)
    termsVersion,
  }));

export type Term = z.infer<typeof TermSchema>;
