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
      await AppDataSource.initialize();
      this.isInitialized = this.ds.isInitialized;
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
    try {
      this.dbSettings();
      await this.ds.transaction(async (t: EntityManager) => {
        // await Promise.all([t.insert(User, generateJaUser())])
        //   .then((_) => console.log('Complete! Seeder'))
        //   .finally(() => this.dbDestroy());
        const userRepo = t.getRepository(User);
        const newUser = userRepo.create({});

        const persisted = await userRepo.save(newUser);
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log('Not Complete Seeder');
        console.log({ name: e.name, message: e.message });
      }
      console.error(e);
      throw new Error(e);
    }
  }
}

new Seeder().SeederStart();
