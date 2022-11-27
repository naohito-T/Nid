import { define } from 'typeorm-seeding';
import { faker as F } from '@faker-js/faker/locale/ja';
import { User } from '@/db/entity';
import { generateSex } from '@/__tests__/helper';

define(User, (): User => {
  const user = new User();
  const sex = F.name.sexType();
  user.firstName = F.name.firstName(sex);
  user.lastName = F.name.lastName(sex);
  // user.birthDate = F.date.birthdate({ min: 18, max: 65 }).toString();
  user.birthDate = '20221127';
  user.sex = generateSex(sex);
  user.nickName = F.name.firstName(sex);
  user.telephoneNumber = F.phone.number();
  user.email = F.internet.email();
  user.thumbnailUrl = 'https://picsum.photos/300/200';
  user.userAddress = null;
  user.userAuthorization = [];
  user.hasTermsVersion = null;
  return user;
});

export default User;
