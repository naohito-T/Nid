import { TypedResponse } from '@/middleware/express';

type ErrorResMessages = {
  message: string;
  code?: string;
}[];

/**
 * @see https://labs.goo.ne.jp/api_error_info/
 * @desc errorレスポンスのシリアライザー
 */
export const errorSerializer = <T>(
  res: TypedResponse<T>,
  // headerに入る。
  statusCode: number,
  // bodyに入る。
  errors: ErrorResMessages,
): void => {
  res.status(statusCode).json({ errors: errors });
};
