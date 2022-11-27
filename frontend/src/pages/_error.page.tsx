import NextErrorComponent from 'next/error';
import type { ErrorProps } from 'next/error';
import type { NextPage, NextPageContext } from 'next';

interface AppErrorProps extends ErrorProps {
  statusCode: number;
  message: string;
  err?: Error;
  hasGetInitialPropsRun?: boolean;
}

/**
 * @memo このエラーページはlocalではnext startでしか動作しない。
 *       また、SSR時のエラーはここに入ることを確認した。
 *
 */
const AppError: NextPage<AppErrorProps> = ({ statusCode, message }) => {
  // if (!hasGetInitialPropsRun && err) {
  //   captureException(err);
  // }
  return <NextErrorComponent statusCode={statusCode} title={message} />;
};

// SSR時はstatusCodeのみが格納される
// fetch error（getServerSideはresに格納）
// render error（resはなし）500のステータスのい
AppError.getInitialProps = async ({ res, err }) => {
  // 推測してくれない
  let statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  let message = res ? res.statusMessage : err ? err.message : 'Internal Server Error.';
  // WORKAROUND なぜかundefinedの推測が外れない
  if (!statusCode) statusCode = 500;
  console.log(`console${statusCode}`);
  console.log(`console${message}`);
  return { statusCode, message };
};

export default AppError;
