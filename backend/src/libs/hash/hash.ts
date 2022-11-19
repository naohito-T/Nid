import bcrypt from 'bcrypt';

/**
 * @desc 平文をハッシュ化する。
 * ハッシュは、一方向のアクションであるという点で暗号化とは異なります。パスワードとソルトを取得し、文字、数字、および記号の行を取得します。
 * 決定的な違いは、初期パスワードを取得する方法がないこと。これがいい。
 * @see https://zenn.dev/wkb/books/node-tutorial/viewer/todo_09
 */
export const createHashedValue = async (planText: string): Promise<string> => {
  // ソルト = 平文に付与する文字という解釈だがここでの文脈は計算回数
  const salt = 10;
  return bcrypt.hash(planText, salt);
};

/**
 * @desc hash化された値と平文を比較しあっていたらtrue
 * @param hashedValue
 * @param planText
 * @returns {Boolean}
 */
export const compareHashedValue = async (hashedValue: string, planText: string) => {
  return bcrypt.compare(hashedValue, planText); // ちな、compare = 合わす
};
