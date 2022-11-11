import type { UserType, SingValueType } from '@/schema';

export interface IGuestResource {
  /**
   * @desc サインアップ（成功時、デフォルトの情報を引っ提げて入力画面へ移行）
   */
  singUp(singValueType: SingValueType): Promise<UserType>;
  /**
   * @desc サインイン（成功時、/user へ遷移する）
   */
  singIn(singValueType: SingValueType): Promise<UserType>;
}
