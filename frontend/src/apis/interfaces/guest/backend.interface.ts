import type { UserType, SignValueType } from '@/schema';
import type { Result, ErrorResponse } from '@/libs/error';

export interface IGuestBackendResource {
  /**
   * @desc サインアップ（成功時、デフォルトの情報を引っ提げて入力画面へ移行）
   */
  signUp(SignValueType: SignValueType): Promise<UserType>;
  /**
   * @desc サインイン（成功時、/user へ遷移する）
   */
  signIn(SignValueType: SignValueType): Promise<UserType>;
}
