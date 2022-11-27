import { Response, NextFunction } from 'express';
import { SignValueScheme, SignValue } from '@/schema';
import { ZodError } from 'zod';
import { TypedRequestBody } from '@/middleware/express';

/**
 * @desc サインインとサインアップで使用する値
 */
export const signValidation = async (
  req: TypedRequestBody<SignValue>,
  _res: Response,
  next: NextFunction,
) => {
  try {
    // validationしたemail&加工したpassword
    const transReq = await SignValueScheme.parseAsync(req.body);
    // WORKAROUND これでいいの？
    req.body.email = transReq.email;
    req.body.password = transReq.password;
    next();
  } catch (e: unknown) {
    if (e instanceof ZodError) {
      throw new Error();
    } else {
      throw new Error('予期せぬエラー');
    }
  }
};
