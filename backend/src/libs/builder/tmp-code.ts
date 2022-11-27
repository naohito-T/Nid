import { TmpCode } from '@/schema';

/**
 * @see https://labs.goo.ne.jp/api_error_info/
 * @desc errorレスポンスのbuilder
 */
export const tmpCodeBuilder = async (tmpCode: string, state: string): Promise<TmpCode> => {
  return { tmpCode, state };
};
