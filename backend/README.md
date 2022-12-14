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

2. volumeにnode_modulesをinstallする
`$ run yarn install`

3. マイグレーションを実行する（migrationフォルダーに配置されているファイルに対して実行）
`$ run yarn m:up`

4. dbにseedする
`$ run yarn s:run`

1. アプリケーションを起動する
`$ up`

## Tips

- package.jsonにパッケージを追加したとき（volumeにライブラリをインストールします）
`$ run yarn install`

- migrationを生成したい時
`TimeStamp_[name].ts`でマイグレーションファイルが作成されるのでnameに値を入れてください。
`$ run yarn m:g src/db/migration/[name]`

- マイグレーションをリバートしたい時
`$ run yarn m:down`

- table自体をdropする
`run yarn m:drop`
