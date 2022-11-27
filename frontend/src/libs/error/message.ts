/**
 * @desc error statusについて調べる必要があるな
 * 100番台	情報
 * 200番台	成功
 * 300番台	リダイレクト
 * 400番台	クライアント再度に起因するエラー
 * 500番台	サーバサイドに起因するエラー
 */
type Key = 'null' | 'undefined' | 'validation' | 'unknown';
type DictionaryValue = {
  message: string;
  statusCode: number;
};
type ErrorDictReadOnly = ReadonlyMap<Key, DictionaryValue>;

// これはstatuCodeによる分岐かな
// さらに分けたい時はどうしよう

export const ErrorSettings: ErrorDictReadOnly = new Map([
  [
    'null',
    {
      message: 'Events_null_occurred',
      statusCode: 400,
    },
  ],
  [
    'undefined',
    {
      message: 'Events_accessing_undefined',
      statusCode: 400,
    },
  ],
  [
    'validation',
    {
      message: 'Events_validation_failed',
      statusCode: 400,
    },
  ],
  [
    'unknown',
    {
      message: 'Events_unknown_error',
      statusCode: 500,
    },
  ],
]);
