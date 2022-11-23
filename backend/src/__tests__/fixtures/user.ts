import { faker as F } from '@faker-js/faker/locale/ja';
import { generateSex } from '@/__tests__/helper';
import { generateJaAddress } from './address';
import { User, Address } from '@/schema';

type CommonUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export const generateJaUser = (): CommonUser => {
  const sex = F.name.sexType();
  return {
    firstName: F.name.firstName(sex),
    lastName: F.name.lastName(sex),
    birthDate: F.date.birthdate({ min: 18, max: 65 }).toString(),
    sex: generateSex(sex),
    nickName: F.name.firstName(sex),
    telephoneNumber: F.phone.number(),
    email: F.internet.email(),
    thumbnailUrl: 'https://picsum.photos/300/200',
    userAddress: [generateJaAddress()],
    userAuthentication: null,
    hasTermsVersion: null,
  };
};
