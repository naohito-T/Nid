import { BackendBase } from '@/apis/services/backend';
import type { IUserResource } from '@/apis/interfaces/user';
import type { UserType, SingValueType } from '@/schema';
/**
 * @desc After login APIs.
 */
export class BackendUserResource extends BackendBase implements IUserResource {
  constructor() {
    super();
  }

  public fetchMe = async (token: string): Promise<UserType> => {
    const headers = { Authorization: `Bearer ${token}` };
    return this.get<UserType>('/api/v1/users/me', headers);
  };

  // public fetchPurchaseHistory(date: Date): Promise<{ id: string; firstName: string; lastName: string; age: string; sex: string; nickName: string; telephoneNumber: string; }> {

  // }
}
