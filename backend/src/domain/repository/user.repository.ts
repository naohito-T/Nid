import { User } from '@/db/entity';
import { AppDataSource } from '@/db/setting';

/**
 * オリジナルから汎用的なメソッドを作成
 */
interface CustomUserRepository {
  findByName: (firstName: string, lastName: string) => Promise<User>;
  // findUserWithAddress: (userId: string) => Promise<UserWithAddress>;
}

const UserRepository = AppDataSource.getRepository(User).extend<CustomUserRepository>({
  /** @desc email with name */
  async findByName(firstName: string, lastName: string): Promise<User> {
    const user = (await this.findBy()) as Promise<User>;
    return user;
  },

  // findUserWithAddress: (userId: string): Promise<UserWithAddress> => {
  //   const userWithAddress = this.findBy() as Repository<UserWithAddress>;
  //   return userWithAddress;
  // },
});

export { UserRepository };
