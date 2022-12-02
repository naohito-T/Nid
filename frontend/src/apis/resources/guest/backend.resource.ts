import { BackendBase } from '@/apis/services/backend';
import type { IGuestBackendResource } from '@/apis/interfaces/guest';
import type { TmpToken, SignValue, ErrorResMessages, SignFlow } from '@/schema';
import { GuestRouter } from '@/configs';

/**
 * @desc Not login APIs.
 * 一時コードのcallbackをプロキシで対応するのはいいかもしれない。
 */
export class BackendGuestResource extends BackendBase implements IGuestBackendResource {
  constructor() {
    super();
  }

  public signUp = async (signValue: SignValue): Promise<TmpToken | ErrorResMessages> => {
    const state = '';

    const tmpCode = await this.post<TmpToken, SignValue & { state: string }>(GuestRouter.signUp, {
      email: signValue.email,
      password: signValue.password,
      state,
    });

    if (tmpCode.isSuccess()) {
      return tmpCode.getSuccessValue();
    } else {
      const { message, statusCode, code, name } = tmpCode.getErrorValue().toJSON();
      this.interceptLogs(message, statusCode, code, name);
      return [{ message, statusCode, code, name }];
    }
  };

  public signIn = async (signValue: SignValue): Promise<TmpToken | ErrorResMessages> => {
    // TODO password暗号化して送信した方がいいかも
    const state = '';

    const tmpCode = await this.post<TmpToken, SignValue & { state: string }>(GuestRouter.signIn, {
      email: signValue.email,
      password: signValue.password,
      state,
    });

    if (tmpCode.isSuccess()) {
      // TODO stateの検証する。
      return tmpCode.getSuccessValue();
    } else {
      const { message, statusCode, code, name } = tmpCode.getErrorValue().toJSON();
      this.interceptLogs(message, statusCode, code, name);
      return [{ message, statusCode, code, name }];
    }
  };

  public snsLogin = async (signFlow: SignFlow): Promise<void> => {};
}
