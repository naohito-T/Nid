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

`TimeStamp_[name].ts`でマイグレーションファイルが作成されます。
```sh
$ run yarn m:g src/db/migration/[name]
# こっちも試してみる
$ run yarn m:g -- -n [name]
```

マイグレーションを実行する（migrationフォルダーに作成される）
```sh
$ run yarn m:up
```

マイグレーションをリバートする
```sh
$ run yarn m:down
```

dbにseedする
```sh
$ run yarn seed
```

```sh
$ up
```

