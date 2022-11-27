export interface AppError {
  statusCode: number;
  message: string;
  code?: string;
}

/**
 * @desc 開発者側で認識するコード（message）とステータスコード
 * @require api側は英語で返す（理由としてさまざまなサービスから利用されるため）
 * @see https://www.itmanage.co.jp/column/http-www-request-response-statuscode/
 * @see https://techblog.istyle.co.jp/archives/8568
 * statusCode: ステータスコードはheaderに含む。
 * message: メッセージは、クライアントがエラーの原因をきちんと理解するために絶対必要になるので、必須に
 * code:（開発者目線）エラーコードは、クライアント側のハンドリングの手掛かりになるために絶対必要になる（このcodeなんだっけ→ドキュメント見るみたいな）
 * codeの対応表
 * NID-xxxxx NID app自体のエラー
 * OTH-xxxxx 他ライブラリのエラー
 */

export const DUPLICATE_EMAIL: AppError = {
  statusCode: 400,
  message: 'duplicate_email',
  code: 'NID-00001',
} as const;

export const UNAUTHORIZED: AppError = {
  statusCode: 401,
  message: 'un_authorized',
  code: 'NID-00002',
} as const;

export const FORBIDDEN: AppError = {
  statusCode: 403,
  message: 'forbidden',
  code: 'NID-00003',
} as const;

export const NOT_FOUND: AppError = {
  statusCode: 404,
  message: 'not_found',
  code: 'NID-00004',
} as const;

export const USER_DELETED: AppError = {
  statusCode: 404,
  message: 'notfound_user',
  code: 'NID-00005',
} as const;

export const UPDATE_RATE_LIMIT: AppError = {
  statusCode: 429,
  message: 'しばらく時間をおいて再度お試しください。',
  code: 'NID-00006',
} as const;

/**
 * @desc バリデーションエラー
 * @ja 予期していないパラメーターが送信されました。確認して再度送信してください
 */
export const NOT_VALIDATION: AppError = {
  statusCode: 499,
  message: 'An validation error has occurred.',
  code: 'NID-00007',
} as const;

/**
 * @desc 予期せぬエラー
 * @ja 予期せぬエラーが発生しました。時間を開けてもう一度お試しください
 */
export const UNEXPECTED: AppError = {
  statusCode: 500,
  message: 'An unexpected error has occurred.',
  code: 'NID-00009',
} as const;

/**
 * @desc DBセットアップエラー
 * @ja 予期せぬエラーが発生しました。時間を開けてもう一度お試しください
 */
export const UN_DB_SETUP: AppError = {
  statusCode: 500,
  message: 'An db setup error has occurred.',
  code: 'NID-00010',
} as const;

/**
 * @desc ミドルウェアセットアップエラー
 * @ja 予期せぬエラーが発生しました。時間を開けてもう一度お試しください
 */
export const UN_MIDDLEWARE_SETUP: AppError = {
  statusCode: 500,
  message: 'An middleware setup error has occurred.',
  code: 'NID-00011',
} as const;

/**
 * @desc ネットワークエラー（NIDが別通信を行ってレスポンスが返ってこずサービスが継続できない）
 * @ja 予期せぬエラーが発生しました。時間を開けてもう一度お試しください
 */
export const COMMUNICATION: AppError = {
  statusCode: 503,
  message: 'Communication error.',
  code: 'NID-00012',
} as const;
