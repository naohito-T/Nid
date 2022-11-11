import { ErrorSettings } from './status';
import { errorLogger } from '@/middleware/log';
/**
 * 1. baseとなる classを作りそこから継承させる
 */

class AppError extends Error {
  constructor(e: Error, msg: string) {
    super(msg);
    // TODO filename取れるか？
    errorLogger.error({ msg, file: __filename });
    // sentryも記載。
  }
}

/**
 * @desc undefinedとnullのerrorでランタイムを止めたくない
 */
export class NullError extends AppError {
  private readonly status?: number;

  constructor(e: Error, msg: string, status?: number) {
    super(e, msg);
    this.status = status;
  }
}

export class UndefinedError extends AppError {
  private readonly status?: number;

  constructor(e: Error, msg: string, status?: number) {
    super(e, msg);
    this.status = status;
  }
}

/**
 * @desc 接続Error
 */
export class HttpError extends Error {
  url: string;

  status: number;

  statusText: string;

  constructor(res: Response) {
    super(res.statusText);
    this.url = res.url;
    this.name = 'HttpError';
    this.status = res.status;
    this.statusText = res.statusText;
  }
}

/**
 * @desc 予期せぬエラー
 */
export class UnknownError extends Error {
  status: number;

  constructor() {
    super(`Unknown Error.`);
    this.name = 'Unknown Error';
    this.status = ErrorSettings.get('unknown')?.statusCode ?? 500;
    this.message = ErrorSettings.get('unknown')?.message ?? '';
  }

  exec() {
    throw new UnknownError();
  }
}

/**
 * @desc validation error（zodで使用するかも）
 */
export class ValidationError extends AppError {
  constructor() {
    super();
  }
}

export const ErrorClassList = [NullError, UndefinedError, HttpError];
