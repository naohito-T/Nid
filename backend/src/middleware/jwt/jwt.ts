/**
 * @important 重要！データベースに JWT トークンを保存する必要はありません。
 * @see https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1
 */

import jwt from 'jsonwebtoken';

/**
 * @desc JWT access token 有効期限
 */
const ACCESS_TOKEN_EXPIRES_IN = '1h';

/**
 * @desc JWT refresh token 有効期限
 */
const REFRESH_TOKEN_EXPIRES_IN = '2d';

/**
 * @desc JWT server同士通信の有効期限
 */
const SERVER_TO_SERVER_EXPIRES_IN = '100y';

const makeJwtAlgorithm = 'ES256';

type Permissions = 'read' | 'updater';

/**
 * @TODO guestからuserになると自身の情報も更新するんだよな....
 */
type JwtPayload = {
  /**
   * @desc userId
   */
  id: string;
  /**
   * @desc 権限
   */
  permissions: Permissions;
};

/**
 * JWT tokenを作成する。
 */
export const generateJWT = (userId: string) => {
  // @return UNIX timestamp 1668832385834
  const start = Date.now();
  const jwtPayload: JwtPayload = { id: userId, permissions: 'read' };

  const token = jwt.sign(jwtPayload, 'dummy', {
    algorithm: makeJwtAlgorithm,
    subject: userId,
    issuer: 'nid',
    audience: 'dummy',
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });

  return token;
};
