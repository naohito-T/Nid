import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { corsOptions } from '@/middleware/cors';
import { setupSession } from '@/middleware/session';
import { setupLogger } from '@/middleware/logger';
/**
 * @NOTE リソースによって分ける
 */

/**
 * @desc common用 middleware
 */
export const settingCommonMiddleware = async (app: express.Express): Promise<void> => {
  /**
   * @see https://qiita.com/qianer-fengtian/items/148602c437e1703aa764
   * @desc helmet
   * @todo ウェブセキュリティを受ける。
   */
  app.use(helmet());
  // cors
  app.use(cors(corsOptions));
  // post対応（json parser）
  app.use(express.json());
  // session
  app.use(setupSession());
  // Parse Cookie
  app.use(cookieParser());
  // log
  const [expressPino] = setupLogger();
  app.use(expressPino);
};
