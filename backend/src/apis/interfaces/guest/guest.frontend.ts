import { SignValue, User } from '@/schema';
export interface IGuestFrontendResource {
  /**
   * @desc signUp情報を元に新規ユーザ情報のレコードを作成。
   * @return {code: string, state: string} 一時コードを返却。
   */
  signUp: (signValue: SignValue) => Promise<string>;
}
