import { atom } from 'recoil';
import { PaletteMode } from '@mui/material';

const paletteModeState = atom<PaletteMode | undefined>({
  key: 'PaletteMode', // 適当なユニークキー
  default: undefined,
});

// 普通は複数のAtomを使うことを想定しているようなので、ある程度は分けるようにしましょう。
// 状態を取得・更新する場合には`useRecoilState()`を使用する。
// これはuseStateと同じ使い方になる。
// atomから状態を取り出す
// const [count, setCount] = useRecoilState(countState);

// 更新の両方ができますが、取得だけしたい場合はuseRecoilValue を使い、更新だけしたい場合はuseSetRecoilState を使用します。
// Reactにおいて値を読み取らない（setだけする）というのは大きな意味を持ち、値が変化した際も再レンダリングが行われないということになります。 これはパフォーマンスを考える上において有利に働きます。値の読み取りが不要な場合は積極的に利用していきましょう。

// SelectorはAtomのstateを加工した値を返したり、Atomのstateを加工して更新するなどの処理を可能にします。
// Atom同様、keyでSelector一つ一つにユニークなIDを設定します。
// getでstateを加工した値を返し、setでstateを加工して更新します。
// Atomが更新される度に再実行されます。
// export const charCountState = selector({
//   key: 'charCountState',
//   // Atomで管理していた文字列を加工して文字数として返却する
//   get: ({get}) => {
//    // get()でAtomから値を取得する
//     const text = get(textState);

//    // 加工した値を返却
//     return text.length;
//   },
// });
