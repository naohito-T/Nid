import { ReactNode, useEffect, useState, useMemo } from 'react';
import type { NextComponentType, NextPageContext } from 'next';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { usePaletteMode } from '@/hooks';

type Props = {
  children: ReactNode;
};

/**
 * @desc _app.page.tsxで読み込むテンプレート
 */
export const ThemeTpl: NextComponentType<NextPageContext, null, Props> = ({ children }) => {
  const [paletteMode, setPaletteMode] = usePaletteMode();
  const [isDarkMode, setIsDarkMode] = useState(paletteMode === 'dark');

  /**
   * @desc memo化 ここの値を変更しないと関数を再実行しないようにする。
   */
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
  };

  useEffect(() => {
    setIsDarkMode(paletteMode === 'dark');
  }, [paletteMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box p={4}>
        <Switch checked={isDarkMode} onChange={handleChangePaletteMode} />
      </Box>
      {children}
    </ThemeProvider>
  );
};
