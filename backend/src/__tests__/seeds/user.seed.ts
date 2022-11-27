import { Factory, Seeder } from 'typeorm-seeding';
import User from '@/__tests__/factories/user.factory';
import UserAddress from '@/__tests__/factories/address.factory';

export class CreateUsersSeed implements Seeder {
  public async run(factory: Factory) {
    // await factory(User)().createMany(20);
    await factory(User)()
      .map(async (user: User) => {
        const addresses: UserAddress[] = await factory(UserAddress)({ userId: user.id }).createMany(
          2,
        );
        const addressIds = addresses.map((address: UserAddress) => address.id);
        // @ts-ignore
        return await user.userAddress().attach(addressIds);
      })
      .createMany(20);
  }
}
