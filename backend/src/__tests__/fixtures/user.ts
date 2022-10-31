import { User, UserAddress, UserAuth, UserRole, SexType } from '@/db/entity';
import { faker as F } from '@faker-js/faker/locale/ja';
import { generateSex } from '@/__tests__/helper';

export const generateJaUser = (): User => {
  const sex = F.name.sexType();
  const user = new User(
    F.name.firstName(sex),
    F.name.lastName(sex),
    F.datatype.number(100),
    generateSex(sex),
    F.name.firstName(sex),
    F.phone.number(),
  );

  return user;
};
