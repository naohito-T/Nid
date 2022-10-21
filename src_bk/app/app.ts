import 'reflect-metadata';
import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { Request, Response } from 'express';
import { AppDataSource } from '@/db/setting/db.setting';
import { Routes } from '@/routers';
import { User } from '@/db/entity/User';
import { corsOptions } from '@/middleware/cors';
import { setupSession } from '@/middleware/session';
import { guestRouter } from '@/routers';
import { commonVersionPath } from '@/configs';

export class Application {
  private app: express.Express;
  private isTest: boolean;

  public constructor(isTest: boolean = false) {
    this.app = express();
    this.isTest = isTest;
  }

  public get getApp() {
    return this.app;
  }

  public setup = async () => {
    // TODO DIで注入できたらいいね。
    console.log('db start');
    // await this.dbConnection(this.isTest);
    // register express routes from defined application routes
    console.log('middleware start');
    await this.setupCommonMiddleware();
    console.log('router start');
    await this.setupRouter();
    console.log('ap9p start');
    await this.launchApp();
  };

  /**
   * @desc dbとconnectionする（testだった場合は、test環境に接続する）
   */
  public static dbConnection = async (isTest: boolean = false) => {
    // if (isTest) {
    //   await AppTestDataSource.initialize();
    // } else {
    //   await AppDataSource.initialize();
    // }
    await AppDataSource.initialize();
  };

  // これ全部のresourceを記載するのはおかしいな。
  // 認可によって起動先を決めたい。
  private setupRouter = async () => {
    this.app.use(commonVersionPath, guestRouter());
  };

  /**
   * @desc 全てのリソース（router）に対し設定するmiddleware
   */
  private setupCommonMiddleware = async () => {
    // cors
    this.app.use(cors(corsOptions));
    // post対応
    this.app.use(bodyParser.json());
    // session
    this.app.use(setupSession());
  };

  /**
   * @desc Start App
   */
  private launchApp = async () => {
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
