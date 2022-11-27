import { define, factory } from 'typeorm-seeding';
import { faker as F } from '@faker-js/faker/locale/ja';
import { User, UserAddress } from '@/db/entity';
import { generateSex } from '@/__tests__/helper';
// import UserAddress from './address.factory';

define(User, (): User => {
  const user = new User();
  const sex = F.name.sexType();
  const firstName = F.name.firstName(sex);
  const lastName = F.name.lastName(sex);

  user.firstName = firstName;
  user.lastName = lastName;
  user.birthDate = '20221127';
  user.sex = generateSex(sex);
  user.nickName = F.name.middleName(sex);
  user.telephoneNumber = F.phone.number();
  user.email = F.internet.email(`${firstName}`, `${lastName}`, 'example.fakerjs.dev');
  user.thumbnailUrl = 'https://picsum.photos/300/200';
  // user.userAddress = factory(UserAddress)().make({ userId: user.id }) as any;
  // user.userAddress = factory(UserAddress)().createMany(3, { user_Id: user.id }) as any;
  user.userAddress = null;
  user.userAuthorization = [];
  user.hasTermVersion = null;
  return user;
});

export default User;
