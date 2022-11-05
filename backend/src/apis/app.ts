import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { DataSource } from 'typeorm';
import { Request, Response } from 'express';
import { AppDataSource } from '@/db/setting/db.setting';
import { Routes } from '@/interfaces/routers';
import { User, SexType } from '@/db/entity/User';
import { corsOptions } from '@/middleware/cors';
import { setupSession } from '@/middleware/session';
import { setupLogger } from '@/middleware/logger';
import { guestRouter } from '@/interfaces/routers';

import { commonVersionPath } from '@/configs';

export class Application {
  private app: express.Express;
  private ds: DataSource;
  private isTest: boolean;
  private isDBInitialized: boolean;

  public constructor(isTest: boolean = false, isDBInitialized: boolean = false) {
    this.app = express();
    this.isTest = isTest;
    this.isDBInitialized = isDBInitialized;
  }

  public get getApp() {
    return this.app;
  }

  public setup = async () => {
    // TODO DIで注入できたらいいね。
    // @see https://typeorm.io/data-source
    await this.settingDatabase();
    await this.settingCommonMiddleware();
    await this.launchApp();
  };

  /**
   * @desc dbとconnectionする（testだった場合は、test環境に接続する）
   */
  private settingDatabase = async () => {
    // testモードではなくdbが起動していない場合
    if (!this.isTest && !this.isDBInitialized) {
      this.ds = await AppDataSource.initialize();
      this.isDBInitialized = this.ds.isInitialized;
    }
  };

  private setupRouter = async () => {
    this.app.use(commonVersionPath, guestRouter());
  };

  /**
   * @desc どのRouterにも適用するmiddleware
   */
  private settingCommonMiddleware = async () => {
    // cors
    this.app.use(cors(corsOptions));
    // post対応（json parser）
    this.app.use(express.json());
    // session
    this.app.use(setupSession());
    // Parse Cookie
    this.app.use(cookieParser());
    // log
    const [expressPino, logger] = setupLogger();
    this.app.use(expressPino);
    logger.info({ msg: 'Finish setup to middleware' });
  };

  /**
   * @desc Start App
   */
  private launchApp = async () => {
    // register express routes from defined application routes
    await this.setupRouter();

    // await this.ds.manager.save(
    //   this.ds.manager.create(User, {
    //     first_name: 'Timber',
    //     last_name: 'Saw',
    //     age: 27,
    //     sex: SexType.female,
    //     nick_name: 'a',
    //     telephone_number: '03030303',
    //   }),
    // );
    // await this.ds.manager.save(
    //   this.ds.manager.create(User, {
    //     first_name: 'Phantom',
    //     last_name: 'Assassin',
    //     age: 24,
    //     sex: SexType.female,
    //     nick_name: 'a',
    //     telephone_number: '03030303',
    //   }),
    // );

    /** 未定義API */
    this.app.use(async (_, res) => {
      await this.ds.destroy();
      res.sendStatus(404);
    });

    process.on('unhandledRejection', (reason, p) => {
      // this.ds.destroy();
      console.error('ハンドルされていない例外 at: Promise', p, 'reason:', reason);
    });
  };
}
