import { Repository, DataSource, EntityManager } from 'typeorm';
import { User } from '@/db/entity';
import { AppDataSource } from '@/db/setting';
import { DuplicateError, DUPLICATE_EMAIL } from '@/libs/errors';
import { SignValue } from '@/schema';

/**
 * オリジナルから汎用的なメソッドを作成
 */
interface CustomGuestRepository {
  findByName: (firstName: string, lastName: string) => Promise<User>;
  findByEmail: (email: string) => Promise<boolean>;
  // registerNewUser: (signValue: SignValue) => Promise<User>;
}

/**
 * @desc Guest権限でdbへ接続する処理をまとめたリポジトリ
 */
export const GuestRepository = AppDataSource.getRepository(User).extend<CustomGuestRepository>({
  /** @desc email with name */
  async findByName(firstName: string, lastName: string): Promise<User> {
    const user = (await this.findBy()) as Promise<User>;
    return user;
  },

  async findByEmail(email: string): Promise<boolean> {
    const user = await GuestRepository.findOne({ where: { email } });
    if (user.email) {
      throw new DuplicateError(DUPLICATE_EMAIL.message, DUPLICATE_EMAIL.statusCode);
    }
    return true;
  },

  // Authとくっつけたやつを返さないといけない。
  // async registerNewUser(signValue: SignValue): Promise<User> {},
});

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
// await this.ds.manager.save(
//   this.ds.manager.create(User, {
//     first_name: 'Phantom',
//     last_name: 'Assassin',
//     age: 24,
//     sex: SexType.female,
//     nick_name: 'a',
//     telephone_number: '03030303',
//   }),
// );
