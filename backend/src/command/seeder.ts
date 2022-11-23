import 'reflect-metadata';
import { AppDataSource } from '@/db/setting';
import { DataSource, EntityManager } from 'typeorm';
import { User, UserAddress, UserAuthentication } from '@/db/entity';
import { generateJaUser } from '@/__tests__/fixtures';

type TasksSeederService = {
  user: User;
  userAddress: UserAddress;
  userAuth: UserAuthentication;
  // userRole: UserRole;
};

const TasksSeeds = [];

/**
 * @desc localとtestで分けるseeder
 */
export class Seeder {
  private readonly tasksSeederService: TasksSeederService;
  // connection data source
  private ds: DataSource;
  // 起動していか確認
  private isInitialized: boolean;
  // 環境変数
  private env: 'development' | 'test';

  private dbSettings = async () => {
    try {
      this.ds = await AppDataSource.initialize().then((ds) => {
        this.isInitialized = ds.isInitialized;
        return ds;
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log('db error');
        console.log({ name: e.name, message: e.message });
      }
    }
  };

  /**
   * @desc dbお掃除
   */
  private dbDestroy = async (): Promise<void> => {
    await this.ds.destroy();
  };

  /**
   * @desc Seeder Scripts
   * 新たにエンティティを加えたい場合は、新規のfixtureを作成しTasksSeederServiceに値を入れてください。
   */
  public async SeederStart() {
    await this.dbSettings();
    console.log(`DB initialized!! ${this.isInitialized}`);

    try {
      await this.ds.transaction(async (t: EntityManager) => {
        // await Promise.all([t.insert(User, generateJaUser())])
        //   .then((_) => console.log('Complete! Seeder'))
        //   .finally(() => this.dbDestroy());
        const userRepo = await t.getRepository(User);
        await userRepo.save(userRepo.create(User));
      });
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
