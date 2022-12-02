import { z } from 'zod';

/**
 * @desc API Error Res
 */
export const ErrorResMessagesScheme = z
  .object({
    message: z.string(),
    statusCode: z.number(),
    code: z.string(),
    name: z.string(),
  })
  .array();

export type ErrorResMessages = z.infer<typeof ErrorResMessagesScheme>;

/**
 * @desc Front側で出力されるエラーメッセージ
 */
export const ResFrontErrorScheme = z
  .object({
    statusCode: z.number().nullable(),
    message: z.string().nullable(),
  })
  .strict();

export type ResFrontError = z.infer<typeof ResFrontErrorScheme>;
