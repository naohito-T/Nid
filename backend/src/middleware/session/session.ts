import type express from 'express';
import session from 'express-session';
import { createDynamoDB } from '@/middleware/aws/aws.base';
import connectDynamoDB from 'connect-dynamodb';
import { AppConfig, Environment } from '@/configs';

/**
 * @desc session storesにdynamoDBを使用
 * express-sessionはCookieにセッションIDのみを保存して、セッションデータは別のストレージに保存するミドルウェア
 * @see https://kazuhira-r.hatenablog.com/entry/2021/12/29/023347
 */

export const setupSession = (): express.RequestHandler => {
  const TABLE = `nid-session`;

  const dynamoDB = connectDynamoDB({ session });

  const DynamoDBStoreOptions = {
    // Optional DynamoDB table name, defaults to 'sessions'
    table: 'nid-session',
    // Optional path to AWS credentials and configuration file
    // AWSConfigPath: './path/to/credentials.json',
    // Optional JSON object of AWS credentials and configuration
    // AWSConfigJSON: {
    //     accessKeyId: 'YOUR_ACCESS_KEY_ID',
    //     secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    //     region: 'ap-northeast-1'
    // },
    // Optional client for alternate endpoint, such as DynamoDB Local
    client: createDynamoDB(),
    // Optional ProvisionedThroughput params, defaults to 5
    readCapacityUnits: 5,
    writeCapacityUnits: 5,
    // セッション保持期間
    reapInterval: 24 * 60 * 60 * 1000,
  };

  // browserに返すのはsession nameと発行されたidだけ
  return session({
    store: new dynamoDB(DynamoDBStoreOptions),
    /** @see https://forum.freecodecamp.org/t/what-is-the-secret-key-in-express-session/354972 */
    /** @see https://tech.chakapoko.com/nodejs/express/session.html */
    secret: process.env.SESSION_SECRET_KEY,
    name: 'session-name', // default: connect.sid⇨検証で見た時にnameになる。
    resave: false,
    // saveUninitialized をtrueに設定すると regenerate メソッドなどで初期化されていないセッションも保存できます。
    // ログイン機能を実装したり、サーバー容量を削減したり、cookieを設定する前に許可が必要な場合などはfalseを設定します。
    saveUninitialized: false,
    cookie: {
      path: '/', // default
      // httpOnly: true, // default
      httpOnly: AppConfig.getRunEnv === Environment.Local ? false : true,
      maxAge: 10 * 60 * 1000, // 10分
      // secure: true,
      secure: AppConfig.getRunEnv === Environment.Local ? false : true,
    },
  });
};
