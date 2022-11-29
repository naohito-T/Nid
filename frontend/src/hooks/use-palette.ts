import { useEffect } from 'react';
import { useMediaQuery, PaletteMode } from '@mui/material';
import { useRecoilState } from 'recoil';
import { paletteAtom, CommonAtomStorageKey } from '@/contexts/common';

type setPaletteModeType = (paletteMode: PaletteMode) => void;
export type usePaletteModeType = () => [PaletteMode, setPaletteModeType];

/**
 * @desc Atom使用のためのWrapper
 */
export const usePaletteMode: usePaletteModeType = () => {
  const [paletteMode, setPaletteMode] = useRecoilState(paletteAtom);
  const paletteModePattern = ['light', 'dark'];
  const prefersPaletteMode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';

  useEffect(() => {
    const paletteMode =
      localStorage.getItem(CommonAtomStorageKey.PALETTE_MODE_STORAGE_KEY) ?? prefersPaletteMode;
    if (paletteModePattern.includes(paletteMode)) {
      setPaletteMode(paletteMode as PaletteMode);
    }
  }, []);

  return [
    paletteMode ?? prefersPaletteMode,
    (paletteMode: PaletteMode) => setPaletteMode(paletteMode),
  ];
};
