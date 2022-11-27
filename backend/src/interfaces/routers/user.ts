import express from 'express';
import type { Router } from 'express-serve-static-core';
import { UserEndpoints } from '@/configs';
import { UserController } from '@/interfaces/controllers';

export const userRouter = (): Router => {
  // エラーログのアップロード
  const router = express.Router();
  const userController = new UserController();

  router.get(UserEndpoints.me);

  return router;
};
