// import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import { useApp } from '@/hooks';
import { messageLogger } from '@/middleware/log';
import { RecoilRoot } from 'recoil';
// import Error from 'next/error';
// import {} from './_errro.page';

type PageProps = {
  error: {
    statusCode: number;
    message: string;
  };
};

const App = ({ Component, pageProps }: AppProps<PageProps>) => {
  const { theme, isDarkMode, handleChangePaletteMode } = useApp();
  // if (pageProps.error) {
  //   return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
  // }

  messageLogger.debug({ msg: `Started App ${process.env.NODE_ENV}`, file: __filename });

  return (
    <RecoilRoot>
      <MuiThemeProvider theme={theme}>
        {/* reset css （CssBaseline をラップしないと Body 要素にテーマが適用されない）*/}
        <CssBaseline />
        <Box p={4}>
          <Switch checked={isDarkMode} onChange={handleChangePaletteMode} />
        </Box>
        <Component {...pageProps} />
      </MuiThemeProvider>
    </RecoilRoot>
  );
};

export default App;
