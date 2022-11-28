import { atom, AtomEffect } from 'recoil';
import type { PaletteMode } from '@mui/material';
import { CommonAtomKey, CommonAtomStorageKey } from './common.key';

/**
 * @desc progress bar用
 */
export const progressAtom = atom({
  key: CommonAtomKey.PROGRESS_KEY,
  default: false,
});

/**
 * @desc Theme 切り替え用
 * @NOTE onSet atomの値変更があるたびに引数に入れたコールバックを実行してくれる。
 */
const paletteEffect: (key: string) => AtomEffect<PaletteMode | undefined> =
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

export const paletteAtom = atom<PaletteMode | undefined>({
  key: CommonAtomKey.PALETTE_ATOM_KEY,
  default: undefined,
  effects: [paletteEffect(CommonAtomStorageKey.PALETTE_MODE_STORAGE_KEY)],
});
