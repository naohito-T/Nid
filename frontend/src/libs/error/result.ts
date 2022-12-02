/**
 * @desc Either Monad（イーザーモナード）でエラーは定義。
 * 失敗する可能性のある計算について、その結果と失敗の理由両方を一度に表現することができる型。
 */
export type Result<T, E extends Error> = Success<T> | Failure<E>;

/**
 * @see https://typescript-jp.gitbook.io/deep-dive/type-system/discriminated-unions
 */

export interface SuccessKind {
  kind: 'success';
  statusCode: number;
}

export interface ErrorKind {
  kind: 'error';
  // statusCode: number;
}

export class Success<T> {
  private readonly statusCode: number;
  private readonly value: T;

  constructor(statusCode: number, value: T) {
    this.statusCode = statusCode;
    this.value = value;
  }
  public isSuccess(): this is Success<T> {
    return true;
  }
  public isFailure(): this is Failure<Error> {
    return false;
  }
  public getSuccessValue(): SuccessKind & T {
    return {
      kind: 'success',
      statusCode: this.statusCode,
      ...this.value,
    };
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
  public getErrorValue(): ErrorKind & E {
    return { kind: 'error', ...this.error };
  }
}
