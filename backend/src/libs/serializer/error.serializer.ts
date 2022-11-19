import { TypedResponse } from '@/middleware/express';

interface ErrorResponse {
  errors: {
    message: string;
    code?: number;
  }[];
}

/**
 * @see https://labs.goo.ne.jp/api_error_info/
 * @desc errorレスポンスのbuilder
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
