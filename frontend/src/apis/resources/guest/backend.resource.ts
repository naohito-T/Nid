import { BackendBase } from '@/apis/services/backend';
import type { IGuestResource } from '@/apis/interfaces/guest';
import type { UserType, SingValueType } from '@/schema';
import { GuestRouter } from '@/configs';

/**
 * @desc Not login APIs.
 */
export class BackendGuestResource extends BackendBase implements IGuestResource {
  constructor() {
    super();
  }

  public signUp = async (singValue: SingValueType): Promise<UserType> => {
    const users = await this.post<UserType, SingValueType>(GuestRouter.signUp, singValue);
    if (users.isSuccess()) {
      return users.getSuccessValue();
    } else {
      const { functionName, statusCode, code, error } = users.getErrorValue();
      this.interceptLogs(functionName, statusCode, code);
      throw error;
    }
  };

  public signIn = async (singValue: SingValueType): Promise<UserType> => {
    const users = await this.post<UserType, SingValueType>(GuestRouter.signIn, singValue);
    if (users.isSuccess()) {
      return users.getSuccessValue();
    } else {
      const { functionName, statusCode, code, error } = users.getErrorValue();
      this.interceptLogs(functionName, statusCode, code);
      throw error;
    }
  };
}
