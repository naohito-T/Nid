import { useEffect, useState } from 'react';
import { createTheme, PaletteMode, useMediaQuery } from '@mui/material';
import { useRecoilState } from 'recoil';
import { appThemeMode } from '@/contexts/common';

export const useApp = () => {
  const paletteModeStorageKey = 'palette_mode';
  const prefersPaletteMode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';
  // const [mode, setMode] = useRecoilState(appThemeMode);
  // checkをしたか（checkがdark）
  const [paletteMode, setPaletteMode] = useState<PaletteMode>(prefersPaletteMode);
  // check（true）が入りdark modeとみなす
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePaletteMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handle change');
    // setPaletteMode(event.target.checked ? 'dark' : 'light');
    setMode(event.target.checked ? 'dark' : 'light');
    // setIsDarkMode(event.target.checked);
    // localStorage.setItem(paletteModeStorageKey, paletteMode);
  };

  return {
    theme,
    isDarkMode,
    handleChangePaletteMode,
  };
};
