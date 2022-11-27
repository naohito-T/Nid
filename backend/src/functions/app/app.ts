import express from 'express';
import { DataSource } from 'typeorm';
import { AppDataSource } from '@/db/setting/db.setting';
import { messageLogger } from '@/middleware/logger';
import { limiter } from '@/middleware/rate';
import { guestRouter } from '@/interfaces/routers';
import { commonVersionPath } from '@/configs';
import { errorSerializer } from '@/libs/serializer';
import {
  NOT_FOUND,
  SetupDBError,
  UN_DB_SETUP,
  SetupMiddlewareError,
  UN_MIDDLEWARE_SETUP,
} from '@/libs/errors';
import { settingCommonMiddleware } from '@/middleware/app.bundle';

export class Application {
  private app: express.Express;
  private ds: DataSource | undefined;
  private isTest: boolean;
  private isAppDBInitialized: boolean;
  private isTestDBInitialized: boolean;

  public constructor(isTest: boolean = false, isDBInitialized: boolean = false) {
    this.app = express();
    this.isTest = isTest;
    this.isAppDBInitialized = isDBInitialized;
    this.ds = undefined;
    this.isTestDBInitialized = false;
  }

  public get getApp() {
    return this.app;
  }

  public setup = async () => {
    // TODO DIで注入できたらいいね。
    // @see https://typeorm.io/data-source
    messageLogger.debug({ msg: 'DB Start.' });
    await this.settingDatabase();
    messageLogger.debug({ msg: 'Middleware Start.' });
    await this.settingCommonMiddleware();
    messageLogger.debug({ msg: 'Launch App Start.' });
    await this.launchApp();
  };

  /**
   * @desc dbとconnectionする（testだった場合は、test環境に接続する）
   */
  private settingDatabase = async () => {
    // testモードではなくdbが起動していない場合
    if (!this.isTest && !this.isAppDBInitialized) {
      try {
        this.ds = await AppDataSource.initialize();
        // 起動フラグを配置する。
        this.isAppDBInitialized = this.ds.isInitialized;
      } catch (e: unknown) {
        messageLogger.error(e);
        throw new SetupDBError(UN_DB_SETUP.message, UN_DB_SETUP.statusCode);
      }
    }
  };

  /**
   * @desc どのRouterにも適用するmiddleware
   */
  private settingCommonMiddleware = async () => {
    try {
      /**
       * @see https://qiita.com/qianer-fengtian/items/148602c437e1703aa764
       * @desc helmet
       * @todo ウェブセキュリティを受ける。
       */
      // this.app.use(helmet());
      // // cors
      // this.app.use(cors(corsOptions));
      // // post対応（json parser）
      // this.app.use(express.json());
      // // session
      // this.app.use(setupSession());
      // // Parse Cookie
      // this.app.use(cookieParser());
      // // log
      // const [expressPino] = setupLogger();
      // this.app.use(expressPino);
      await settingCommonMiddleware(this.app);
    } catch (e: unknown) {
      messageLogger.error(e);
      throw new SetupMiddlewareError(UN_MIDDLEWARE_SETUP.message, UN_MIDDLEWARE_SETUP.statusCode);
    }
  };

  /**
   * @desc Start Setup Router
   */
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
    await this.setupRouter();

    /**
     * @desc 未定義API
     */
    this.app.use(async (_, res) => {
      // await this.ds.destroy();
      errorSerializer(res, NOT_FOUND.statusCode, [
        { message: NOT_FOUND.message, code: NOT_FOUND.code },
      ]);
    });

    /**
     * @desc catchされずに残るエラーをここで吸収
     */
    process.on('unhandledRejection', (reason, p) => {
      // this.ds.destroy();
      console.error('ハンドルされていない例外 at: Promise', p, 'reason:', reason);
    });
  };
}
