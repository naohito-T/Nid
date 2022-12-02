import type { TmpToken, SignValue, SignFlow, ErrorResMessages } from '@/schema';

export interface IGuestBackendResource {
  /**
   * @desc サインアップ（成功時、デフォルトの情報を引っ提げて入力画面へ移行）
   */
  signUp(signValue: SignValue): Promise<TmpToken | ErrorResMessages>;
  /**
   * @desc サインイン（成功時、/ へ遷移する）
   */
  signIn(signValue: SignValue): Promise<TmpToken | ErrorResMessages>;
  /**
   * @desc SNS login（成功時、/ へ遷移する）
   */
  snsLogin(signFlow: SignFlow): Promise<void>;
}
