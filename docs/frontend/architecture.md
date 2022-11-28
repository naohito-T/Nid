# Architecture to Frontend

Project start.
`npx create-next-app@latest frontend --ts`

## State
[参考URL](https://zenn.dev/akfm/articles/react-state-scope)
Browser historyなライフタイムを目指す。
例: アコーディオンを開いて次のページへ行って戻ったらまた開いてる。

- Local State
  - Component unmount

- Client State
  - JavaScript memory
  - Browser history
    - recoil-syncを用いて開発する。
  - URL Persistence
  - Browser storage

- Server State
  - Server


Local State
React.useState

Client State
Recoil

Server State
SWR

## Stateの永続化

永続化はsessionStorageに保存するよう。

## 再レンダリングをさせない努力

`useMemo`を所々使用している。
また以下のブログでもあるが、あるコンポーネントがひとつ余計なuseMemoを持っているよりも、ひとつ余計な`<div>`をレンダリングする方が、パフォーマンス（レンダリングにかかる時間）をより悪化させる。
[参考URL](https://zenn.dev/uhyo/articles/usememo-time-cost)
