import { ReactNode, useEffect, useState, useMemo } from 'react';
import type { NextComponentType, NextPageContext } from 'next';
import {
  Box,
  createTheme,
  CssBaseline,
  Switch,
  ThemeProvider,
  PaletteMode,
  useMediaQuery,
} from '@mui/material';
import { usePaletteMode } from '@/hooks';

type Props = {
  children: ReactNode;
};

export const ThemeTpl: NextComponentType<NextPageContext, null, Props> = ({ children }) => {
  const paletteModeStorageKey = 'palette_mode';
  const prefersPaletteMode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';
  const [paletteMode, setPaletteMode] = usePaletteMode();
  const [isDarkMode, setIsDarkMode] = useState(paletteMode === 'dark');

  // const theme = createTheme({
  //   palette: {
  //     mode: paletteMode,
  //   },
  // });
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: paletteMode,
          primary: {
            main: '#61dafb',
          },
          secondary: {
            main: '#EB9612CC',
          },
        },
      }),
    [paletteMode],
  );

  const handleChangePaletteMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaletteMode(event.target.checked ? 'dark' : 'light');
    setIsDarkMode(event.target.checked);
    localStorage.setItem(paletteModeStorageKey, paletteMode);
  };

  useEffect(() => {
    const paletteMode = localStorage.getItem(paletteModeStorageKey) ?? prefersPaletteMode;
    if (['light', 'dark'].includes(paletteMode)) {
      setPaletteMode(paletteMode as PaletteMode);
      setIsDarkMode(paletteMode === 'dark');
      localStorage.setItem(paletteModeStorageKey, paletteMode);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box p={4}>
        Palette Mode :
        <Switch checked={isDarkMode} onChange={handleChangePaletteMode} />
        {paletteMode}
      </Box>
      {children}
    </ThemeProvider>
  );
};
