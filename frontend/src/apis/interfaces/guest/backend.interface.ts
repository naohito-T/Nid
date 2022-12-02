import type { TmpToken, SignValue, SignFlow, ErrorResMessages } from '@/schema';
import type { SuccessKind, ErrorKind } from '@/libs/error';

export type ResTmpToken = Promise<
  (SuccessKind & TmpToken) | (ErrorKind & { value: ErrorResMessages })
>;

export interface IGuestBackendResource {
  /**
   * @desc サインアップ（成功時、デフォルトの情報を引っ提げて入力画面へ移行）
   */
  signUp(signValue: SignValue): ResTmpToken;
  /**
   * @desc サインイン（成功時、/ へ遷移する）
   */
  signIn(signValue: SignValue): ResTmpToken;
  /**
   * @desc SNS login（成功時、/ へ遷移する）
   */
  snsLogin(signFlow: SignFlow): Promise<void>;
}
