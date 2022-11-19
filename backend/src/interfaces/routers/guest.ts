import express from 'express';
import type { Router } from 'express-serve-static-core';
import { UserEndpoints, GuestEndpoints } from '@/configs';
import { GuestController } from '@/interfaces/controllers';
import { Request, Response, NextFunction } from 'express';
import { signValidation } from '@/libs/validations';

export const guestRouter = (): Router => {
  // エラーログのアップロード
  const router = express.Router();
  const guestController = new GuestController();

  /**
   * 順番としては
   * 1. method判定
   * 2. そのapi path判定
   * 3. バリデーション
   * 4. handlerに渡す。ここコントローラにする？
   */

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

  router.get(UserEndpoints.users, guestController.getUsers);

  router.post(GuestEndpoints.signUp, signValidation, guestController.signUp);
  router.post(GuestEndpoints.signIn, signValidation, guestController.signIn);

  return router;
};
