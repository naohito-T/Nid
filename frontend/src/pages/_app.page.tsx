// import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Box, createTheme, CssBaseline, PaletteMode, Switch, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { messageLogger } from '@/middleware/log';
import { runtimeEnv, Environment } from '@/configs';

const paletteModes = ['light', 'dark'];
const paletteModeStorageKey = 'palette_mode';

const App = ({ Component, pageProps }: AppProps) => {
  console.log(`${runtimeEnv() === Environment.Development}`);
  messageLogger.debug({ msg: 'Started App', file: __filename });

  const paletteModeStorageKey = 'palette_mode';
  const prefersPaletteMode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';
  const [paletteMode, setPaletteMode] = useState<PaletteMode>(prefersPaletteMode);
  const [isDarkMode, setIsDarkMode] = useState(paletteMode === 'dark');

  const theme = createTheme({
    palette: {
      mode: paletteMode,
    },
  });

  useEffect(() => {
    const paletteMode = localStorage.getItem(paletteModeStorageKey) ?? prefersPaletteMode;
    if (['light', 'dark'].includes(paletteMode)) {
      setPaletteMode(paletteMode as PaletteMode);
      setIsDarkMode(paletteMode === 'dark');
      localStorage.setItem(paletteModeStorageKey, paletteMode);
    }
  }, []);

  const handleChangePaletteMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaletteMode(event.target.checked ? 'dark' : 'light');
    setIsDarkMode(event.target.checked);
    localStorage.setItem(paletteModeStorageKey, paletteMode);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box p={4}>
        Palette Mode :
        <Switch checked={isDarkMode} onChange={handleChangePaletteMode} />
        {paletteMode}
      </Box>
      <Component {...pageProps} />
    </MuiThemeProvider>
  );
};

export default App;
