import { BackendBase } from '@/apis/services/backend';
import type { IGuestBackendResource, ResTmpToken } from '@/apis/interfaces/guest';
import type { TmpToken, SignValue, SignFlow } from '@/schema';
import { GuestRouter } from '@/configs';
import type { SuccessKind, ErrorKind } from '@/libs/error';

/**
 * @desc Not login APIs.
 * 一時コードのcallbackをプロキシで対応するのはいいかもしれない。
 */

export class BackendGuestResource extends BackendBase implements IGuestBackendResource {
  constructor() {
    super();
  }

  public signUp = async (signValue: SignValue): ResTmpToken => {
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
      return { kind: 'error', value: [{ message, statusCode, code, name }] };
    }
  };

  public signIn = async (signValue: SignValue): ResTmpToken => {
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
      return { kind: 'error', value: [{ message, statusCode, code, name }] };
    }
  };

  public snsLogin = async (signFlow: SignFlow): Promise<void> => {};
}
