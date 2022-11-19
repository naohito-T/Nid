import { z } from 'zod';
import { ICommonSchema } from './_common';
import { validationMessages as V } from '@/libs/validations';

/**
 * @desc console.log(new Date(0 * 1000));
 * → Thu Jan 01 1970 09:00:00 GMT+0900 (日本標準時)
 */
export const TermsSchema = ICommonSchema.extend({
  termsVersion: z.date().min(new Date(0 * 1000), { message: V.min }),
})
  .strict()
  .transform(async ({ id, createdAt, updatedAt, termsVersion }) => ({
    id,
    createdAt,
    updatedAt,
    // 管理画面からは日付がくる（UNIXタイムスタンプ）最小Thu Jan 01 1970 09:00:00 GMT+0900 (日本標準時)
    termsVersion,
  }));

export type Terms = z.infer<typeof TermsSchema>;
