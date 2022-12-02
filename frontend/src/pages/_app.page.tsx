import type { AppProps } from 'next/app';
import Error from 'next/error';
import { messageLogger } from '@/middleware/log';
import { RecoilRoot } from 'recoil';
import { ThemeTpl } from '~/components/templates/theme/theme.tpl';

type PageProps = {
  error: {
    statusCode: number;
    message: string;
  };
};

/**
 * @NOTE _app.tsxはRecoilRootに囲われていないためusePaletteMode が使用できない
 */
const App = ({ Component, pageProps }: AppProps<PageProps>) => {
  // if (pageProps.error) {
  //   return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
  // }

  messageLogger.debug({
    msg: `Started App ${process.env.NODE_ENV}`,
    file: __filename,
  });

  return (
    <RecoilRoot>
      <ThemeTpl>
        <Component {...pageProps} />
      </ThemeTpl>
    </RecoilRoot>
  );
};

export default App;
