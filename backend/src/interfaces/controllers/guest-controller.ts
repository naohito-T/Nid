/**
 * @desc loginしていないコントローラ
 */
import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '@/db/setting/db.setting';
import { GuestServices } from '@/apis/services';

/**
 * @desc controllerに渡す前にはバリデーションは完成している。
 * ここからはサービスを呼びだす。
 * サービスを呼び出したあと処理を実行して
 */
export class GuestController {
  private guestService: GuestServices;

  constructor() {
    this.guestService = new GuestServices();
  }

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {};

  public signUp = async (req: Request, res: Response, next: NextFunction) => {};

  public signIn = async (req: Request, res: Response, next: NextFunction) => {};
}
