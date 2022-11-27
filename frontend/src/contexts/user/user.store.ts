import { atom, selector, atomFamily } from 'recoil';

/**
 * Reactにおいて値を読み取らない（setだけする）というのは大きな意味を持ち、
 * 値が変化した際も再レンダリングが行われないということになります。
 * これはパフォーマンスを考える上において有利に働きます。
 * 値の読み取りが不要な場合は積極的に利用していきましょう。
 *
 * useRecoilValue: 値のみを取得できる
 * useSetRecoilState: 更新だけしたい場合
 * Selector: Atomの値を加工して取得する、加工して更新するなどの処理が可能（key, get, set）を渡す
 * ※非同期処理もできる（getメソッドをasyncにする）
 */
export const UserStore = () => {
  // 保存したいのはstateとかバックする時の情報とか？
};

// atomFamily がAtomと違う大きな点のひとつとして、 default を関数にできることです。default にすることによって、引数に応じたデフォルト値を設定できます。
const itemStateFamily = atomFamily({
  key: 'sample/item',
  default: 0,
});
