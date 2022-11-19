import { SignValue, User } from '@/schema';
export interface IGuestFrontendResource {
  signUp: (signValue: SignValue) => Promise<User>;
}
