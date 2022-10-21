// https://stackoverflow.com/questions/49618719/why-does-typeorm-need-reflect-metadata
import 'reflect-metadata';
import { Application } from '@/app';
import { Environment, runtimeEnv } from '@/configs';

// jestはdef testで起動する。
const isTest = runtimeEnv() === Environment.Test;
console.log(`isTest${isTest}`);
// DIの注入？（testの場合はtrueをアプリケーションに注入）
// 注入することで以下ができる
// - 起動したままjestでtestができる
Application.dbConnection(isTest)
  .then((r) => {
    const app = new Application(isTest);
    app
      .setup()
      .then((_) => {
        app.getApp.listen(3100, () => {
          console.log(
            'Express server has Started!!! on port 3100. Open http://localhost:3100/users to see results',
          );
        });
      })
      .catch((e: unknown) => console.log(e));
  })
  .catch((e: unknown) => console.log(e));
