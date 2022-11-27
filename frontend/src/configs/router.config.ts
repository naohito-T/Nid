class BaseRouter {
  public static readonly BASE_PATH: string = '/api/v1';
  public static readonly BASE_PATH_USER: string = '/api/v1/users';
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
export class UserRouter {
  private static readonly ME = `${BaseRouter.BASE_PATH_USER}/me`;

  static get me(): string {
    return this.ME;
  }
}
