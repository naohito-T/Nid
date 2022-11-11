import type { UserType, SingValueType } from '@/schema';
import type { Result, ErrorResponse } from '@/libs/error';

export interface IGuestResource {
  /**
   * @desc サインアップ（成功時、デフォルトの情報を引っ提げて入力画面へ移行）
   */
  signUp(singValueType: SingValueType): Promise<UserType>;
  /**
   * @desc サインイン（成功時、/user へ遷移する）
   */
  signIn(singValueType: SingValueType): Promise<UserType>;
}
