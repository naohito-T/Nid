/**
 * @desc 開発者側で認識するコードとステータスコード
 */
export interface NIDErrorCode {
  statusCode: number;
  message: string;
  code: string;
}

export const NOT_FOUND_STORAGE: NIDErrorCode = {
  statusCode: 401,
  message: 'ログインが必要です。',
  code: 'NID-00011',
};

export const TOKEN_EXPIRE: NIDErrorCode = {
  statusCode: 401,
  message: 'ログインが必要です。',
  code: 'NID-00011',
};

/**
 * @desc 無効なトークンと判断されたときalbから返却される。
 */
export const JWT_NOT_VERIFIED: NIDErrorCode = {
  statusCode: 401,
  message: 'ログインが必要です。',
  code: 'NID-00011',
};

export const UNAUTHORIZED: NIDErrorCode = {
  statusCode: 401,
  message: 'ログインが必要です。',
  code: 'NID-00011',
};

/** 403 Forbidden */
export const FORBIDDEN: NIDErrorCode = {
  statusCode: 403,
  message: 'アクセスが禁止されています',
  code: 'NID-00011',
};

/** 404 NotFound */
export const NOT_FOUND: NIDErrorCode = {
  statusCode: 404,
  message: 'リソースが見つかりませんでした。',
  code: 'NID-00011',
};

/** 404 NotFound */
export const USER_DELETED: NIDErrorCode = {
  statusCode: 404,
  message: 'ユーザが見つかりませんでした。',
  code: 'NID-00011',
};

export const UPDATE_RATE_LIMIT: NIDErrorCode = {
  statusCode: 429,
  message: 'しばらく時間をおいて再度お試しください。',
  code: 'NID-00011',
};

/** 499 ClosesConnection */
export const NOT_CORRECT: NIDErrorCode = {
  statusCode: 499,
  message: '予期していないパラメーターが送信されました。確認して再度送信してください',
  code: 'NID-00011',
};

export const UNEXPECTED: NIDErrorCode = {
  statusCode: 500,
  message: '予期せぬエラーが発生しました。時間を開けてもう一度お試しください',
  code: 'NID-00011',
};
