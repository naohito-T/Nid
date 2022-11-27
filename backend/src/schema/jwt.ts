import { z } from 'zod';

/**
 * @desc JWTに格納されたデータ
 * @property
 *  sub: 識別子（userId）
 *  iat: 発行時刻（UNIX Timestamp）
 *  exp: 有効期限（UNIX Timestamp）
 *  aud: JWTを利用することが想定された主体の識別子
 *  iss: 発行者の識別子
 */
const jwtSchema = z.object({
  sub: z.string().min(1),
  iat: z.number().min(1),
  exp: z.number().min(1),
  aud: z.string().min(1),
  iss: z.string().min(1),
});

export type JWT = z.infer<typeof jwtSchema>;
