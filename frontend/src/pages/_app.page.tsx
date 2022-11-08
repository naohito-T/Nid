// import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline, Switch } from '@mui/material';
import { useApp } from '@/hooks';
import { messageLogger } from '@/middleware/log';

const App = ({ Component, pageProps }: AppProps) => {
  messageLogger.debug({ msg: `Started App ${process.env.NODE_ENV}`, file: __filename });
  const { theme, isDarkMode, handleChangePaletteMode } = useApp();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box p={4}>
        <Switch checked={isDarkMode} onChange={handleChangePaletteMode} />
      </Box>
      <Component {...pageProps} />
    </MuiThemeProvider>
  );
};

export default App;
