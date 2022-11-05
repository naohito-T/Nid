import { Repository, DataSource, EntityManager } from 'typeorm';
import { User, UserEntity } from '@/db/entity';
import { AppDataSource } from '@/db/setting';

/**
 * オリジナルから汎用的なメソッドを作成
 */
interface CustomGuestRepository {
  findByName: (firstName: string, lastName: string) => Promise<User>;
  // findUserWithAddress: (userId: string) => Promise<UserWithAddress>;
}

const GuestRepository = AppDataSource.getRepository(User).extend<CustomGuestRepository>({
  /** @desc email with name */
  async findByName(firstName: string, lastName: string): Promise<User> {
    const user = (await this.findBy()) as Promise<User>;
    return user;
  },
});

export { GuestRepository };
