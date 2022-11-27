import type { TmpToken, SignValue } from '@/schema';

export interface IGuestBackendResource {
  /**
   * @desc サインアップ（成功時、デフォルトの情報を引っ提げて入力画面へ移行）
   */
  signUp(signValue: SignValue): Promise<TmpToken>;
  /**
   * @desc サインイン（成功時、/user へ遷移する）
   */
  signIn(signValue: SignValue): Promise<TmpToken>;
}
