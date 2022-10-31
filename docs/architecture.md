# Architecture

個人で使う程度のためserverlessでいい。
albを理解するためのProject

## Purpose

naohito-T Provides login functionality for client projects.

## Backend

serverless-frameworkにする。

- ハンドラー層: API Gatewayなどから入力を受け取り、バリデーションやオブジェクトの変換を行う
- ドメイン層: ユースケースに対するビジネスロジックとインタフェースを定義する
- インフラストラクチャ層: AWS SDKを利用したAWSサービスとのやりとりや外部APIへのアクセスを行う

dddっぽく作ってるけど
[参考URL](https://neos21.net/blog/2021/10/13-01.html)

以下をやりたい。
- localではdevとtestのdbを作成する
- testに関してはtest DBに接続する。

client
↓
router
↓
validation
↓
controller
↓
services（リソース分け）
↓
domain/entities db接続処理
↓
domain/models db接続処理終わったあとデータ格納
↓
controller
↓
シリアライザー or ビルダー
↓
res

```sh
backend/
├ routes/      … (ルーティング・URL 定義)
├ controllers/ … (リクエストを受け取りレスポンスするだけ) ここでbuilderする
├ services/    … (ドメインサービス。基本的にコントローラからサービスを呼び出してあれこれ処理させる作りにしがち)
├ models/      … (ドメインモデル。FW や ORM に依存せず、プロパティとメソッドを持つクラス)
└ entities/    … (TypeORM などの ORM と連携するためのエンティティ。「ドメインモデル」とほぼ同じだけど ORM 用のクラスが出来がち)
```

これやる
[参考URL](https://expressjs.com/ja/advanced/best-practice-security.html)

## localでの実行

2つ用意する？
厳密には開発はDockerでいいと思うが、
Lambdaを限りなく再現したい。とかであれば、以下を利用する
[参考URL](https://qiita.com/yasomaru/items/fa708a1f21a79e637868)

## localでのsameSite

クロスサイトだとlocalはcookieが送信できない（http通信のため）
そのためlocalではproxyを動作させ、同一オリジンに偽装させる（フロントから）

### localStack

[参考URL](https://qiita.com/mmclsntr/items/709863ba98a4855988f3)
[これも採用](https://zenn.dev/dove/articles/c0bc8aca695f07)

http://localhost:24566/
`{"status": "running"}`

### TypeORM
[CLI Document](https://orkhan.gitbook.io/typeorm/docs/using-cli)
[migrationはこれを見ろ](https://qiita.com/Aurum64/items/f5962bd2a643447dbef9)

typeorm-ts-node-commonjs
### Serverless

```sh
$ serverless create --template aws-nodejs-typescript --name my-special-service --path my-special-service
```

```sh
$ serverless create --template aws-nodejs --name my-special-service --path my-special-service
```

## env

localに関してはenvをそのまま。
しかしLambdaに設定できる環境変数が4kbまでのためパラメーターストアに移動しないといけない。

方針としてはika

local
- localのenv

cloud
- パラメーターストア

---

## Frontend

Project start.
`npx create-next-app@latest frontend --ts`

