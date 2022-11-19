import { TypedResponse } from '@/middleware/express';

interface SuccessResFormat<T> {
  data: T;
}

/**
 * @see https://labs.goo.ne.jp/api_error_info/
 * @desc errorレスポンスのbuilder
 */
export const successSerializer = <T>(
  res: TypedResponse<T>,
  statusCode: number,
  successValue: T,
) => {
  res.status(statusCode).json(successValue);
};
