import { NextFunction } from 'express';
import { ZodError } from 'zod';
import { TypedRequestBody, TypedResponse } from '@/middleware/express';
import { errorSerializer } from '@/libs/serializer';
import { UNEXPECTED, NOT_VALIDATION } from '@/libs/errors';

interface ValidationError {
  message: string;
  code: string;
}

/**
 * @desc 対象のバリデーションを注入する。バリデーションだけではなく返したい。
 */
export const validator = async <T, R>(
  validation: any,
  req: TypedRequestBody<T>,
  res: TypedResponse<R>,
  next: NextFunction,
) => {
  try {
    next();
  } catch (e: unknown) {
    if (e instanceof ZodError) {
      const zodErrors = e.errors.map((z) => {
        return {
          message: z.message,
          code: z.code,
        };
      });

      errorSerializer(res, UNEXPECTED.statusCode, [
        { message: NOT_VALIDATION.message, code: NOT_VALIDATION.code },
        ...zodErrors,
      ]);
    } else {
      errorSerializer(res, UNEXPECTED.statusCode, [
        { message: UNEXPECTED.message, code: UNEXPECTED.code },
      ]);
    }
  }
};

// バリデーションエラーはこんな感じ
// {
//   "issues": [
//     {
//       "validation": "email",
//       "code": "invalid_string",
//       "message": "Invalid email",
//       "path": [
//         "mailAddress"
//       ]
//     }
//   ],//   "name": "ZodError"
// }
