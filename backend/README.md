# Awesome Project Build with TypeORM

Steps to run this project.

A short command is provided. If you want to use.
`$ . ./bin/alias`

1. Run `yarn install` command
2. Run `up` command

## 新規にvolumeを作成する場合

dbデータなどmigrationがかかってないためmigrationを適用される。
本番とかはどうするのかな
案としては以下

- migrationファイルに差分があれば実行する
- 手動で実行する仕組みを用意（多分こちらのが安全）

## migration command

dbを完全な状態で起動しないといけない。

1. イメージをビルドする。
`$ build`

2. マイグレーションを実行する（migrationフォルダーに作成される）
`$ run yarn m:up`

3. dbにseedする
`$ run yarn seed`

4. アプリケーションを起動する
`$ up`

## Tips

- package.jsonにパッケージを追加したとき（volumeにライブラリをインストールします）
`$ run yarn install`  

- migrationを生成したい時
`TimeStamp_[name].ts`でマイグレーションファイルが作成されるのでnameに値を入れてください。
`$ run yarn m:g src/db/migration/[name]`

- マイグレーションをリバートしたい時
`$ run yarn m:down`

- db自体をdropする。
