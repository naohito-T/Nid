class BaseRouter {
  public static readonly BASE_PATH: string = '/api/v1';
}

/**
 * @desc Router for Guest
 */
export class GuestRouter {
  private static readonly SIGN_UP = `${BaseRouter.BASE_PATH}/sign-up`;
  private static readonly SIGN_IN = `${BaseRouter.BASE_PATH}/sign-in`;

  static get signUp(): string {
    return this.SIGN_UP;
  }

  static get signIn(): string {
    return this.SIGN_IN;
  }
}

/**
 * @desc Router for User
 */
export class UserRouter {}
