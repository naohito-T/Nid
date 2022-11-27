import { SexType } from '@/db/entity';

export const generateSex = (type: string): SexType => {
  switch (type) {
    case 'male':
      return SexType.male;
    case 'female':
      return SexType.female;
    default:
      return SexType.none;
  }
};
