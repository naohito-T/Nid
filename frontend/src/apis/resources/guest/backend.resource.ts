import { BackendBase } from '@/apis/services/backend';
import type { IGuestBackendResource } from '@/apis/interfaces/guest';
import type { UserType, SignValueType } from '@/schema';
import { GuestRouter } from '@/configs';

/**
 * @desc Not login APIs.
 */
export class BackendGuestResource extends BackendBase implements IGuestBackendResource {
  constructor() {
    super();
  }

  public signUp = async (singValue: SignValueType): Promise<UserType> => {
    const users = await this.post<UserType, SignValueType>(GuestRouter.signUp, singValue);
    if (users.isSuccess()) {
      return users.getSuccessValue();
    } else {
      const { functionName, statusCode, code, error } = users.getErrorValue();
      this.interceptLogs(functionName, statusCode, code);
      throw error;
    }
  };

  public signIn = async (singValue: SignValueType): Promise<UserType> => {
    const users = await this.post<UserType, SignValueType>(GuestRouter.signIn, singValue);
    if (users.isSuccess()) {
      return users.getSuccessValue();
    } else {
      const { functionName, statusCode, code, error } = users.getErrorValue();
      this.interceptLogs(functionName, statusCode, code);
      throw error;
    }
  };
}
