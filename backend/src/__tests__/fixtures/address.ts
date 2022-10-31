import { UserAddress } from '@/db/entity';
import { faker as F } from '@faker-js/faker/locale/ja';

export const generateJaAddress = (userId: string): UserAddress => {
  const address = new UserAddress(userId);
  address.zip_code = F.address.zipCode('#######'); // '6920000'
  address.prefecture = F.address.state();
  address.city = F.address.city();
  address.street = F.address.street();
  address.building = F.address.buildingNumber();
  return address;
};
