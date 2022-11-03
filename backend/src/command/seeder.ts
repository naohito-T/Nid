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

export class Seeder {
  // connection作成
  private readonly tasksSeederService: TasksSeederService;
  private ds: DataSource;
  private isInitialized: boolean;

  async SeederStart() {
    try {
      await AppDataSource.initialize();
      this.isInitialized = this.ds.isInitialized;

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
      console.error(e);
      await this.ds.destroy();
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
