import session from 'express-session';
import { createDynamoDB } from '@/middleware/aws/aws.base';
import connectDynamoDB from 'connect-dynamodb';

/**
 * @desc session storesにdynamoDBを使用
 * express-sessionはCookieにセッションIDのみを保存して、セッションデータは別のストレージに保存するミドルウェア
 * @see https://kazuhira-r.hatenablog.com/entry/2021/12/29/023347
 */

declare module 'express-session' {
  interface SessionData {
    firstAccessTime: string;
    counter: number;
    message: string;
  }
}

export const setupSession = () => {
  const TABLE = `nid-session`;

  const _createStore = (): session.Store => {
    const client = createDynamoDB();

    const dynamoDBStore = connectDynamoDB({ session });

    // eslint-disable-next-line new-cap
    return new dynamoDBStore({
      table: TABLE,
      client,
    });
  };

  return session({
    store: _createStore(),
    /** @see https://forum.freecodecamp.org/t/what-is-the-secret-key-in-express-session/354972 */
    secret: process.env.SESSION_SECRET_KEY,
    name: 'session', // default: connect.sid
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: '/', // default
      httpOnly: true, // default
      maxAge: 10 * 1000, // 10sec
    },
  });
};
