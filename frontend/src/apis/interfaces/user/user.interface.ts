import type { UserType } from '@/schema';

export interface IUserResource {
  /**
   * @desc login後に取得する自身の秘匿情報
   */
  fetchMe(token: string): Promise<UserType>;
  /**
   * @desc 購入履歴を出力する（pdf）
   */
  // fetchPurchaseHistory(date: Date): Promise<UserType>;
}
