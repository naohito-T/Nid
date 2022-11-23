import { TypedResponse } from '@/middleware/express';

/**
 * @see https://labs.goo.ne.jp/api_error_info/
 * @desc errorレスポンスのシリアライザー
 */
export const errorSerializer = <T>(
  res: TypedResponse<T>,
  // headerに入る。
  statusCode: number,
  // bodyに入る。
  errors: { message: string; code?: number }[],
) => {
  res.status(statusCode).json({ errors: errors });
};
