import { TypedResponse } from '@/middleware/express';

/**
 * @see https://labs.goo.ne.jp/api_error_info/
 * @desc successレスポンスのシリアライザー
 */
export const successSerializer = <T>(
  res: TypedResponse<T>,
  statusCode: number,
  successValue: T,
) => {
  res.status(statusCode).json(successValue);
};
