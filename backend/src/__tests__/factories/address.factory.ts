import { define, factory } from 'typeorm-seeding';
import { faker as F } from '@faker-js/faker/locale/ja';
import { User, UserAddress } from '@/db/entity';

define(UserAddress, (): UserAddress => {
  const address = new UserAddress();
  address.zipCode = F.address.zipCode();
  address.prefecture = F.address.state();
  address.city = F.address.city();
  address.street = F.address.street();
  address.building = F.address.buildingNumber();
  address.user = factory(User)() as any;
  return address;
});

export default UserAddress;
