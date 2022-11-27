import { NextFunction } from 'express';
import { TypedRequestBody, TypedResponse } from '@/middleware/express';
import { FrontendGuestResource } from '@/apis/resources/guest';
import { SignValue, TmpCode } from '@/schema';
import { tmpCodeBuilder } from '@/libs/builder';
import { successSerializer, errorSerializer } from '@/libs/serializer';
import { UnexpectedError, UNEXPECTED } from '@/libs/errors';

/**
 * @desc loginしていないコントローラ
 */
export class GuestController {
  private guestResource: FrontendGuestResource;

  constructor() {
    this.guestResource = new FrontendGuestResource();
  }

  /**
   * @desc サインアップ成功時 jwtの一時コードを返却する。
   */
  public signUp = async (
    req: TypedRequestBody<SignValue>,
    res: TypedResponse<TmpCode>,
    _: NextFunction,
  ) => {
    try {
      // serviceで
      const { email, password } = req.body;
      console.log(`email ${email}`);
      console.log(`password ${password}`);
      const tmpCode = await this.guestResource.signUp(req.body);
      // builder
      const builtTmpToken = await tmpCodeBuilder(tmpCode, 'dummy');
      // send
      successSerializer<TmpCode>(res, 200, builtTmpToken);
    } catch (e: unknown) {
      // TODO ここ綺麗にしたい。どんなエラーが出力されるのが明確だが
      if (e instanceof Error) {
        errorSerializer<TmpCode>(res, UNEXPECTED.statusCode, [
          { message: UNEXPECTED.message, code: UNEXPECTED.code },
        ]);
      } else if (e instanceof UnexpectedError) {
        errorSerializer<TmpCode>(res, UNEXPECTED.statusCode, [
          { message: UNEXPECTED.message, code: UNEXPECTED.code },
        ]);
      } else {
        errorSerializer<TmpCode>(res, UNEXPECTED.statusCode, [
          { message: UNEXPECTED.message, code: UNEXPECTED.code },
        ]);
      }
    }
  };

  // public signIn = async (req: Request, res: Response, next: NextFunction) => {};
}
