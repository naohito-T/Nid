import express from 'express';
import type { Router } from 'express-serve-static-core';
import { UserEndpoints } from '@/configs';
import { UserController } from '@/interfaces/controller/UserController';
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
  const uc = new UserController();

  const a = async (req: Request, res: Response, next: NextFunction) => {
    const ress = await uc.all(req, res, next);
    res.send(ress);
  };

  router.get('/test', (req, res) => {
    // @ts-ignore
    if (!req.session.views) {
      // @ts-ignore
      req.session.views = 0;
    }
    // カウントアップ
    // @ts-ignore
    req.session.views++;
    // アクセス回数を表示
    console.log('heell');
    // @ts-ignore
    res.send('Hello World! Count:' + req.session.views);
  });

  router.get('/logout', (req, res) => {
    // セッションを破棄
    req.session.destroy((err) => {
      res.send('logout');
    });
  });

  router.get(UserEndpoints.users, a);

  return router;
};
