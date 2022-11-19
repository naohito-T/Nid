/**
 * @desc loginしていないコントローラ
 */
import { NextFunction, Request, Response } from 'express';
import { FrontendGuestResource } from '@/apis/resources/guest';
import { SignValue, User, TmpCode } from '@/schema';
import { TypedRequestBody, TypedResponse } from '@/middleware/express';
import { tmpCodeBuilder } from '@/libs/builder';
import { successSerializer, errorSerializer } from '@/libs/serializer';
import { UnexpectedError, UNEXPECTED } from '@/libs/errors';

/**
 * @desc controllerに渡す前にはバリデーションは完成している。
 * ここからはサービスを呼びだす。
 * サービスを呼び出したあと処理を実行して
 * エラーハンドリングの最終地点
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
    next: NextFunction,
  ) => {
    try {
      // serviceで
      const tmpCode = await this.guestResource.signUp(req.body);
      // builder
      const builtTmpToken = await tmpCodeBuilder(tmpCode, 'dummy');
      // send
      successSerializer<TmpCode>(res, 200, builtTmpToken);
    } catch (e: unknown) {
      // TODO ここ綺麗にしたい。どんなエラーが出力されるのが明確だが
      if (e instanceof Error) {
        errorSerializer<TmpCode>(res, UNEXPECTED.statusCode, [
          { message: UNEXPECTED.message, code: UNEXPECTED.statusCode },
        ]);
      } else if (e instanceof UnexpectedError) {
        errorSerializer<TmpCode>(res, UNEXPECTED.statusCode, [
          { message: UNEXPECTED.message, code: UNEXPECTED.statusCode },
        ]);
      } else {
        errorSerializer<TmpCode>(res, UNEXPECTED.statusCode, [
          { message: UNEXPECTED.message, code: UNEXPECTED.statusCode },
        ]);
      }
    }
  };

  public signIn = async (req: Request, res: Response, next: NextFunction) => {};
}
