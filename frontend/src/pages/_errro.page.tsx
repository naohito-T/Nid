import NextErrorComponent from 'next/error';
import type { ErrorProps } from 'next/error';
import type { NextPage } from 'next';

interface AppErrorProps extends ErrorProps {
  err?: Error;
  hasGetInitialPropsRun?: boolean;
}

const AppError: NextPage<AppErrorProps> = ({ statusCode }) => {
  // if (!hasGetInitialPropsRun && err) {
  //   captureException(err);
  // }

  return <NextErrorComponent statusCode={statusCode} />;
};

AppError.getInitialProps = async (ctx) => {
  const errorInitialProps: AppErrorProps = await NextErrorComponent.getInitialProps(ctx);
  console.log(`errorInitialProps${errorInitialProps}`);
  errorInitialProps.hasGetInitialPropsRun = true;
  if (ctx.err) {
    return errorInitialProps;
  }

  return errorInitialProps;
};

export default AppError;
