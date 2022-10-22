import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';
import { AppDataSource, AppTestDataSource } from '@/db/setting/db.setting';
import { Routes } from '@/routers';
import { User } from '@/db/entity/User';
import { corsOptions } from '@/middleware/cors';
import { setupSession } from '@/middleware/session';
import { guestRouter } from '@/routers';

import { commonVersionPath } from '@/configs';

export class Application {
  private app: express.Express;
  private isTest: boolean;

  public constructor(isTest: boolean) {
    this.app = express();
    this.isTest = isTest;
  }

  public get getApp() {
    return this.app;
  }

  public setup = async () => {
    // TODO DIで注入できたらいいね。
    await this.dbConnection(this.isTest);
    await this.launchApp();
  };

  /**
   * @desc dbとconnectionする（testだった場合は、test環境に接続する）
   */
  private dbConnection = async (isTest: boolean) => {
    if (isTest) {
      await AppTestDataSource.initialize();
    } else {
      await AppDataSource.initialize();
    }
  };

  private setupRouter = async () => {
    // Routes.forEach((route) => {
    //   this.app[route.method](route.route, (req: Request, res: Response, next: Function) => {
    //     const result = new (route.controller as any)()[route.action](req, res, next);
    //     if (result instanceof Promise) {
    //       result.then((result) =>
    //         result !== null && result !== undefined ? res.send(result) : undefined,
    //       );
    //     } else if (result !== null && result !== undefined) {
    //       res.json(result);
    //     }
    //   });
    // });
    this.app.use(commonVersionPath, guestRouter());
  };

  /**
   * @desc Start App
   */
  private launchApp = async () => {
    // cors
    this.app.use(cors(corsOptions));
    // post対応（json parser）
    this.app.use(express.json());
    // this.app.use(bodyParser.json());
    // session
    this.app.use(setupSession());
    // Parse Cookie
    this.app.use(cookieParser());

    // register express routes from defined application routes
    await this.setupRouter();

    await AppDataSource.manager.save(
      AppDataSource.manager.create(User, {
        firstName: 'Timber',
        lastName: 'Saw',
        age: 27,
      }),
    );

    await AppDataSource.manager.save(
      AppDataSource.manager.create(User, {
        firstName: 'Phantom',
        lastName: 'Assassin',
        age: 24,
      }),
    );
  };
}