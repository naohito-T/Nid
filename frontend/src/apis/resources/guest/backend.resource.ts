import { BackendBase } from '@/apis/services/backend';
import type { IGuestResource } from '@/apis/interfaces/guest';
import type { UserType, SingValueType } from '@/schema';
import { GuestRouter } from '@/configs';
import { errorLogger } from '@/middleware/log';

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

  /**
   * @desc GuestResource ユーティリティ Logs（ここにdatadog or sentry）
   */
  private interceptLogs = (functionName: string, statusCode: number, code: string) => {
    errorLogger.error({
      functionName,
      statusCode,
      code,
    });
  };

  // full pathでしかできない（csrで叩いているから？）
  // public getUsers = async () => this.axios.get<User[]>('http://localhost:3100/v1/users');
  // public getTest = async () => this.axios.get<User[]>('http://localhost:3100/v1/test');
}
