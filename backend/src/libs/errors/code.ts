export interface AppError {
  statusCode: number;
  message: string;
  code?: number;
}

/**
 * @desc 開発者側で認識するコード（message）とステータスコード
 * @require api側は英語で返す（理由としてさまざまなサービスから利用されるため）
 * @see https://www.itmanage.co.jp/column/http-www-request-response-statuscode/
 * @see https://techblog.istyle.co.jp/archives/8568
 * statusCode: ステータスコードはheaderに含む。
 * message: メッセージは、クライアントがエラーの原因をきちんと理解するために絶対必要になるので、必須に
 * code:（開発者目線）エラーコードは、クライアント側のハンドリングの手掛かりになるために絶対必要になる（このcodeなんだっけ→ドキュメント見るみたいな）
 */

export const DUPLICATE_EMAIL: AppError = {
  statusCode: 400,
  message: 'duplicate_email',
  code: 4000,
} as const;

export const UNAUTHORIZED: AppError = {
  statusCode: 401,
  message: 'un_authorized',
  code: 4001,
} as const;

export const FORBIDDEN: AppError = {
  statusCode: 403,
  message: 'forbidden',
  code: 4003,
} as const;

export const NOT_FOUND: AppError = {
  statusCode: 404,
  message: 'not_found',
} as const;

export const USER_DELETED: AppError = {
  statusCode: 404,
  message: 'notfound_user',
} as const;

export const UPDATE_RATE_LIMIT: AppError = {
  statusCode: 429,
  message: 'しばらく時間をおいて再度お試しください。',
} as const;

export const NOT_CORRECT: AppError = {
  statusCode: 499,
  message: '予期していないパラメーターが送信されました。確認して再度送信してください',
} as const;

export const UNEXPECTED: AppError = {
  statusCode: 500,
  message: '予期せぬエラーが発生しました。時間を開けてもう一度お試しください',
} as const;
