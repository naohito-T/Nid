import { Repository, DataSource, EntityManager } from 'typeorm';
import { User, UserEntity } from '@/db/entity';
import { AppDataSource } from '@/db/setting';

/**
 * オリジナルから汎用的な
 */
interface UserRepositoryMethod {
  findByName: (firstName: string, lastName: string) => Promise<User>;
  findUserWithAddress: (userId: string) => Promise<UserWithAddress>;
}

const UserRepository = AppDataSource.getRepository(User).extend<UserRepositoryMethod>({
  /** @desc email with name */
  async findByName(firstName: string, lastName: string): Promise<User> {
    const user = (await this.findBy()) as Repository<User>;
    return user;
  },

  findUserWithAddress: (userId: string): Promise<UserWithAddress> => {
    const userWithAddress = this.findBy() as Repository<UserWithAddress>;
    return userWithAddress;
  },

  // findByName: (firstName: string, lastName: string): Promise<User> => {
  //   return this.findOne('user')
  //     .where('user.firstName = :firstName', { firstName })
  //     .andWhere('user.lastName = :lastName', { lastName })
  //     .getMany();
  // },
});

export { UserRepository };
