import { z } from 'zod';

/**
 * @desc idがUUIDのbaseスキーム
 */
export const UCommonSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * @desc idがぷr
 */
export const ICommonSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
