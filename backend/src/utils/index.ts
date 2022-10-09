const SPACE_REG = /\s+/g;

/**
 * @desc 文字列を指定の区切り文字で分割する。文字列に空白があればそれも取り除く。
 */
export const excludeSpaceWithSplit = (specified: string, text: string) => {
  return text.replace(SPACE_REG, '').split(specified);
};
