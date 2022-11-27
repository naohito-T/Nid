import { Factory, Seeder } from 'typeorm-seeding';
import User from '@/__tests__/factories/user.factory';

export class CreateUsersSeed implements Seeder {
  public async run(factory: Factory) {
    await factory(User)().createMany(20);
  }
}
