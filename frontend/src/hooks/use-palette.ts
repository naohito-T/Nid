// import '../styles/globals.css';
import { useMemo, useEffect } from 'react';
import { createTheme, useMediaQuery, PaletteMode } from '@mui/material';
import { useRecoilState } from 'recoil';
import { paletteAtom, PALETTE_MODE_STORAGE_KEY } from '@/contexts/common';

type setPaletteModeType = (paletteMode: PaletteMode) => void;
export type usePaletteModeType = () => [PaletteMode, setPaletteModeType];

export const usePaletteMode: usePaletteModeType = () => {
  const prefersPaletteMode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';
  const [paletteMode, setPaletteMode] = useRecoilState(paletteAtom);

  useEffect(() => {
    const paletteMode = localStorage.getItem(PALETTE_MODE_STORAGE_KEY);

    if (paletteMode !== null && ['light', 'dark'].includes(paletteMode)) {
      setPaletteMode(paletteMode as PaletteMode);
    }
  });
  /**
   * @desc modeが変わった時のみレンダリングするようにする。
   */
  // const theme = useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode: paletteMode,
  //         primary: {
  //           main: '#61dafb',
  //         },
  //         secondary: {
  //           main: '#EB9612CC',
  //         },
  //       },
  //     }),
  //   [paletteMode],
  // );

  return [paletteMode, (paletteMode: PaletteMode) => setPaletteMode(paletteMode)];
};
