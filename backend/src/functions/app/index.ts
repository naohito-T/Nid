import 'reflect-metadata';
import serverlessExpress from '@vendia/serverless-express';
import { Application } from './app';
import { Environment, runtimeEnv } from '@/configs';
import { messageLogger } from '@/middleware/logger';

// jestはdef testで起動する。
const isTest = runtimeEnv() === Environment.Test;
// DIの注入？（testの場合はtrueをアプリケーションに注入）
// 注入することで以下ができる
// - 起動したままjestでtestができる
const app = new Application(isTest);

app
  .setup()
  .then((_) => {
    app.getApp.listen(3100, () => {
      messageLogger.info(
        'Express server has Started!!! on port 3100. Open http://localhost:3100/api/v1/users to see results',
      );
    });
  })
  .catch((e: unknown) => messageLogger.error(e));

export const nidBackendHandler = serverlessExpress({ app: app.getApp });
