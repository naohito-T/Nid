import { atom, AtomEffect } from 'recoil';
import type { PaletteMode } from '@mui/material';
import { PALETTE_MODE_STORAGE_KEY } from './common.key';
/**
 * @desc progress bar用
 */
export const progressAtom = atom({
  key: 'progressKey',
  default: false,
});

/**
 * @desc Theme 切り替え用
 */

// const localStorageEffect =
//   (key: string): AtomEffect<ThemeMode> =>
//   ({ setSelf, onSet }) => {
//     const stored = localStorage.getItem(key);
//     if (stored === 'dark' || stored === 'light') {
//       setSelf(stored);
//     }

//     onSet((value, _, isReset) => {
//       if (isReset) {
//         localStorage.removeItem(key);
//       } else {
//         localStorage.setItem(key, value || _);
//       }
//     });
//   };

const paletteEffect: (key: string) => AtomEffect<PaletteMode> =
  (key) =>
  ({ onSet }) => {
    onSet((newValue, _, isReset) => {
      if (isReset || newValue === undefined) {
        localStorage.removeItem(key);
        return;
      }

      localStorage.setItem(key, newValue);
    });
  };

export const paletteAtom = atom<PaletteMode>({
  key: 'app_palette_mode',
  default: 'dark',
  effects: [paletteEffect(PALETTE_MODE_STORAGE_KEY)],
});
