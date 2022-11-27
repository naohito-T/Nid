import pino from 'pino';
import { runtimeEnv, Environment } from '@/configs';
/**
 * @desc development 環境ではフォーマットされたログ出力
 *       production 環境下では JSON フォーマット出力による高速なログ出力
 *       '${ログネームスペース}': '${ログレベル}' で出すか
 *       例えばuser pageでerrorが出たら、user: infoレベルみたいな。
 */

//  * - 'fatal'
//  * - 'error'
//  * - 'warn'
//  * - 'info' // default
//  * - 'debug'
//  * - 'trace'

/**
 * @desc local時はコンソールに、本番時は出力する。
 * @property level logを出す最低レベルを設定
 * @property transport logを出力する場所
 */
const logger =
  runtimeEnv() === Environment.Development
    ? pino({
        name: 'nid-frontend',
        level: 'debug',
        transport: {
          target: 'pino-pretty',
        },
      })
    : pino({
        name: 'nid-frontend',
        level: 'info',
        // TODO 出力先考える
        transport: {
          target: 'pino-pretty',
        },
      });

/**
 * @desc Log for async
 */
export const fetchLogger = logger.child({ target: 'fetch' });

/**
 * @desc Log for CSR Render
 */
export const csrLogger = logger.child({ target: 'csr' });

/**
 * @desc Log for SSR Render
 */
export const ssrLogger = logger.child({ target: 'ssr' });

/**
 * @desc Log for event handler
 */
export const eventLogger = logger.child({ target: 'event' });

/**
 * @desc Log for message
 */
export const messageLogger = logger.child({ target: 'message' });

/**
 * @desc Log for error
 * これはいらないと思う。errorハンドリングできているから
 */
// export const errorLogger = logger.child({ target: 'error' });
