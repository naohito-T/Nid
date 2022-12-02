import { z } from 'zod';

/**
 * @desc error レスポンス
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
