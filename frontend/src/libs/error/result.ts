/**
 * @desc Either Monad（イーザーモナード）でエラーは定義。
 * 失敗する可能性のある計算について、その結果と失敗の理由両方を一度に表現することができる型。
 */
export type Result<T, E extends Error> = Success<T> | Failure<E>;

export class Success<T> {
  private readonly value: T;

  constructor(value: T) {
    this.value = value;
  }
  public isSuccess(): this is Success<T> {
    return true;
  }
  public isFailure(): this is Failure<Error> {
    return false;
  }
  public getSuccessValue(): T {
    return this.value;
  }
}

export class Failure<E extends Error> {
  private readonly error: E;

  constructor(error: E) {
    this.error = error;
  }
  public isSuccess(): this is Success<unknown> {
    return false;
  }
  public isFailure(): this is Failure<E> {
    return true;
  }
  public getErrorValue(): E {
    return this.error;
  }
}
