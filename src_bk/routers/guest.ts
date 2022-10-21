import express from 'express';
import type { Router } from 'express-serve-static-core';
import { UserEndpoints } from '@/configs';
import { UserController } from '@/controller/UserController';
import { Request, Response, NextFunction } from 'express';

export const guestRouter = (): Router => {
  // エラーログのアップロード
  const router = express.Router();

  /**
   * 順番としては
   * 1. method判定
   * 2. そのapi path判定
   * 3. バリデーション
   * 4. handlerに渡す。ここコントローラにする？
   */

  // TODO とりあえず
  const uc = new UserController();

  const a = async (req: Request, res: Response, next: NextFunction) => {
    const ress = await uc.all(req, res, next);
    res.send(ress);
  };

  router.get(UserEndpoints.users, a);

  return router;
};
