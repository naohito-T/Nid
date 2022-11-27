import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { runSeeder, tearDownDatabase, useRefreshDatabase, useSeeding } from 'typeorm-seeding';
import { AppDataSource } from '@/db/setting';
import { CreateUsersSeed } from '@/__tests__/seeds/user.seed';
import { UN_DB_SETUP, SetupDBError } from '@/libs/errors';
import { eventLogger } from '@/middleware/logger';

/**
 * @desc localとtestで分けるseeder
 */
export class Seeder {
  // connection data source
  private ds: DataSource;
  // 起動していか確認
  private isInitialized: boolean;

  private dbSettings = async () => {
    try {
      this.ds = await AppDataSource.initialize().then((ds) => {
        this.isInitialized = ds.isInitialized;
        return ds;
      });
    } catch (e: unknown) {
      eventLogger.error(e);
      throw new SetupDBError(UN_DB_SETUP.message, UN_DB_SETUP.statusCode);
    }
  };
  /**
   * @desc Seeder Scripts
   * 新たにエンティティを加えたい場合は、新規のfixtureを作成しTasksSeederServiceに値を入れてください。
   */
  public async SeederStart() {
    await this.dbSettings();
    console.log(`DB initialized!! ${this.isInitialized}`);

    try {
      //DBに接続＆内部のデータをクリア
      // await useRefreshDatabase();
      console.log('useRefreshDatabase');
      //プロジェクト内のfactoryをロードする
      await useSeeding({ connection: 'nid' });
      console.log('useRefreshDatabaseddd');
      //シーダーを実行する
      await runSeeder(CreateUsersSeed);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log('Not Complete Seeder');
        console.log({ name: e.name, message: e.message });
      }
    }
  }
}

new Seeder().SeederStart();

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
