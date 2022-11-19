/**
 * @desc 新規エラークラスを定義したい場合は以下のクラスを必ず継承してください。
 * @property retry リトライした回数を入れておく
 */
class BaseError extends Error {
  constructor(message: string, private statusCode: number, private retry: number = 0) {
    super(message);
    this.name = new.target.name; // newした際にターゲットが入る。
  }

  /**
   * @desc JSONで出力させたい時
   */
  toJSON() {
    return {
      retry: this.retry,
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      stack: this.stack,
    };
  }
}

/**
 * @desc 重複エラー
 */
export class DuplicateError extends BaseError {}

/**
 * @desc 予期せぬエラー
 */
export class UnexpectedError extends BaseError {}
