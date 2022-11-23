import { UserAddress } from '@/db/entity';
import { faker as F } from '@faker-js/faker/locale/ja';
import { Address } from '@/schema';

// entityでできるのかな
// export const generateJaAddress = (userId: string): UserAddress => {
//   const address = new UserAddress(userId);
//   address.zipCode = F.address.zipCode('#######'); // '6920000'
//   address.prefecture = F.address.state();
//   address.city = F.address.city();
//   address.street = F.address.street();
//   address.building = F.address.buildingNumber();
//   return address;
// };

type CommonAddress = Omit<Address, 'id' | 'createdAt' | 'updatedAt'>;

export const generateJaAddress = (): CommonAddress => {
  return {
    zipCode: F.address.zipCode(),
    prefecture: F.address.state(),
    city: F.address.city(),
    street: F.address.street(),
    building: F.address.buildingNumber(),
  };
};
