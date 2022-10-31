# Awesome Project Build with TypeORM

Steps to run this project.

A short command is provided. If you want to use.
`$ . ./bin/alias`

1. Run `yarn install` command
2. Run `up` command


## 新規にvolumeを作成する場合

dbデータなどmigrationがかかって

## migration command


`TimeStamp_[name].ts`でマイグレーションファイルが作成されます。
```sh
$ run yarn migration:generate src/db/migration/[name]
```

マイグレーションを実行する（migrationフォルダーに作成される）
```sh
$ run yarn migration:run
```

マイグレーションをリバートする
```sh
$ run yarn migration:revert
```

dbにseedする
```sh
$ run yarn seed
```

```sh
$ up
```

