import { BackendBase } from '@/apis/services/backend';
import type { IUserResource } from '@/apis/interfaces/user';
import type { UserType } from '@/schema';
import { UserRouter } from '@/configs';

/**
 * @desc After login APIs.
 */
export class BackendUserResource extends BackendBase implements IUserResource {
  constructor() {
    super();
  }

  public fetchMe = async (token: string): Promise<UserType> => {
    const headers = { Authorization: `Bearer ${token}` };
    const me = await this.get<UserType>(UserRouter.me, headers);
    if (me.isSuccess()) {
      return me.getSuccessValue();
    } else {
      const { functionName, statusCode, code, error } = me.getErrorValue();
      this.interceptLogs(functionName, statusCode, code);
      throw error;
    }
  };

  // public fetchPurchaseHistory(date: Date): Promise<{ id: string; firstName: string; lastName: string; age: string; sex: string; nickName: string; telephoneNumber: string; }> {

  // }
}
