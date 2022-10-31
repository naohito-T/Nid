import bcrypt from 'bcrypt';

export const createHashedValue = async (planText: string) => {
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
