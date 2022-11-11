// import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import { useApp } from '@/hooks';
import { messageLogger } from '@/middleware/log';
import { RecoilRoot } from 'recoil';

const App = ({ Component, pageProps }: AppProps) => {
  messageLogger.debug({ msg: `Started App ${process.env.NODE_ENV}`, file: __filename });
  const { theme, isDarkMode, handleChangePaletteMode } = useApp();

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
