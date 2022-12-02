import { ReactNode, useMemo } from 'react';
import type { NextComponentType, NextPageContext } from 'next';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { usePaletteMode } from '@/hooks';

type Props = {
  readonly children: Required<React.ReactNode>;
};

/**
 * @desc _app.page.tsxで読み込むテンプレート
 */
export const ThemeTpl: NextComponentType<NextPageContext, null, Props> = ({ children }) => {
  const [paletteMode] = usePaletteMode();

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
