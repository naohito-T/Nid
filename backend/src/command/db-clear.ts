import { AppDataSource } from '@/db/setting';
import { DataSource, EntityManager } from 'typeorm';
import { User, UserAddress, UserAuthentication, UserRole } from '@/db/entity';
import { generateJaUser } from '@/__tests__/fixtures';

type TasksSeederService = {
  user: User;
  userAddress: UserAddress;
  userAuth: UserAuthentication;
  userRole: UserRole;
};

const TasksSeeds = [];

/**
 * @desc 引数もらってdbをclearする
 */
export class Seeder {
  // connection作成
  private readonly tasksSeederService: TasksSeederService;
  private ds: DataSource;
  private isInitialized: boolean;
  private env: 'development' | 'test';

  private dbSettings = async () => {
    await AppDataSource.initialize();
    this.isInitialized = this.ds.isInitialized;
  };

  async SeederStart() {
    try {
      await this.dbSettings;
      await this.clearTables();
      await this.ds.transaction(async (t: EntityManager) => {
        let result = await Promise.all([t.insert(User, generateJaUser())]);
        if (result[0]) {
          console.log('Complete! Seeder');
        } else {
          console.log('Not Complete Seeder');
        }
      });
    } catch (e: unknown) {
      await this.ds.destroy();
      console.error(e);
      throw new Error(e);
    }
  }

  // SQLの TRUNCATE TABLEにあたる。
  async clearTables() {
    // TODO 繰り返しにする。
    if (this.isInitialized) {
      this.ds.manager.clear(User);
    }
  }
}

new Seeder().SeederStart();
