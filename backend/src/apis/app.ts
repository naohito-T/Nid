import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { DataSource } from 'typeorm';
import { AppDataSource } from '@/db/setting/db.setting';
import { corsOptions } from '@/middleware/cors';
import { setupSession } from '@/middleware/session';
import { setupLogger, messageLogger } from '@/middleware/logger';
import { limiter } from '@/middleware/rate';
import { guestRouter } from '@/interfaces/routers';
import { commonVersionPath } from '@/configs';
import { errorSerializer } from '@/libs/serializer';
import { NOT_FOUND } from '@/libs/errors';

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
    messageLogger.debug({ msg: 'DB Start.' });
    if (!this.isTest && !this.isDBInitialized) {
      try {
        this.ds = await AppDataSource.initialize();
        // 起動フラグを配置する。
        this.isDBInitialized = this.ds.isInitialized;
        messageLogger.debug({ msg: 'Finish setup to db.' });
      } catch (e: unknown) {
        messageLogger.error(e);
        throw new Error('db setup error');
      }
    }
  };

  /**
   * @desc どのRouterにも適用するmiddleware
   */
  private settingCommonMiddleware = async () => {
    await messageLogger.debug({ msg: 'Middleware Start.' });
    try {
      // cors
      this.app.use(cors(corsOptions));
      // post対応（json parser）
      this.app.use(express.json());
      // session
      this.app.use(setupSession());
      // Parse Cookie
      this.app.use(cookieParser());
      // log
      const [expressPino] = setupLogger();
      this.app.use(expressPino);
      messageLogger.info({ msg: 'Finish setup to middleware' });
    } catch (e: unknown) {
      messageLogger.error(e);
      throw new Error('middleware error');
    }
  };

  private setupRouter = async () => {
    /**
     * @desc pathごとにrate limitかける
     */
    this.app.use(commonVersionPath, limiter);
    this.app.use(commonVersionPath, guestRouter());
  };

  /**
   * @desc Start App
   */
  private launchApp = async () => {
    // register express routes from defined application routes
    messageLogger.debug({ msg: 'Launch App Start.' });
    await this.setupRouter();

    /** 未定義API */
    this.app.use(async (_, res) => {
      // await this.ds.destroy();
      errorSerializer(res, NOT_FOUND.statusCode, [
        { message: NOT_FOUND.message, code: NOT_FOUND.statusCode },
      ]);
    });

    process.on('unhandledRejection', (reason, p) => {
      // this.ds.destroy();
      console.error('ハンドルされていない例外 at: Promise', p, 'reason:', reason);
    });
  };
}
