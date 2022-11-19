import { TypedResponse } from '@/middleware/express';

interface ErrorResFormat {
  error: {
    code: number;
    message: string;
  };
}

/**
 * @see https://labs.goo.ne.jp/api_error_info/
 * @desc errorレスポンスのbuilder
 */
export const errorBuilder = (
  res: TypedResponse<ErrorResFormat>,
  statusCode: number,
  message: string,
) => {
  res.status(statusCode).json({
    error: {
      code: statusCode,
      message,
    },
  });
};
