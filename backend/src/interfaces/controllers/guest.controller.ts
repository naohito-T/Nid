/**
 * @desc loginしていないコントローラ
 */
import { NextFunction, Request, Response } from 'express';
import { FrontendGuestResource } from '@/apis/resources/guest';
import { SignValue, User } from '@/schema';
import { TypedRequestBody, TypedResponse } from '@/middleware/express';
import { successSerializer, errorSerializer } from '@/libs/serializer';
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
    res: TypedResponse<User>,
    next: NextFunction,
  ) => {
    try {
      // serviceで
      const user = await this.guestResource.signUp(req.body);
      // builder
      // const buildUser = bulder(user)
      // send
      // successSerializer<User>(res, 200, user);
    } catch (e: unknown) {
      if (e instanceof Error) {
        // errorSerializer();
      }
    }
  };

  public signIn = async (req: Request, res: Response, next: NextFunction) => {};
}
