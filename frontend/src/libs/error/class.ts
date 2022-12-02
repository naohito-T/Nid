export class NIDError extends Error {
  /**
   * @desc headerに入る想定
   */
  private statusCode: number;
  /**
   * @desc 開発者コード
   */
  private code: string;
  /**
   * @desc リトライ回数
   */
  private retry: number;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'NID-00011',
    retry: number = 0,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.retry = retry;
    this.name = new.target.name;
  }

  /**
   * @desc JSONで出力させたい時
   */
  public toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      code: this.code,
      name: this.name,
      retry: this.retry,
    };
  }
}

/**
 * @desc 予期せぬエラークラス
 */
export class UnexpectedError extends NIDError {}

/**
 * @desc alb側からトークンの有効期限が切れているエラーコードが返却された時に出力する。
 * @TODO 再度loginしてください。など案内が必要。
 */
export class AxiosError extends NIDError {}

/**
 * @desc alb側でuserが削除されているが、localStorageにtokenが残っている時に出力する。
 * @TODO 現状案内などがないため、アカウントが削除されておりますとかの確認が必要。
 */
export class UserDeletedError extends NIDError {}

/**
 * @desc alb側からトークンの有効期限が切れているエラーコードが返却された時に出力する。
 * @TODO 再度loginしてください。など案内が必要。
 */
export class TokenExpireError extends NIDError {}

/**
 * @desc alb側からトークンの有効期限が切れているエラーコードが返却された時に出力する。
 * @TODO 再度loginしてください。など案内が必要。
 */
export class LoginError extends NIDError {}
