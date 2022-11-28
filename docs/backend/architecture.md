# Architecture to Backend


## serverless

```sh
sls create -t aws-nodejs-typescript -p sample
```

## directory structure
[ディレクトリ関連はこれにする](https://qiita.com/os1ma/items/286eeec028e30e27587d)
[参考URL](https://neos21.net/blog/2021/10/13-01.html)
[バックエンドは※rを採用](https://zenn.dev/tatta/books/5096cb23126e64/viewer/b0ba7c)

```sh
backend/
├ routes/      … (ルーティング・URL 定義)
├ controllers/ … (リクエストを受け取りレスポンスするだけ) ここでbuilderする
├ services/    … (ドメインサービス。基本的にコントローラからサービスを呼び出してあれこれ処理させる作りにしがち)
├ models/      … (ドメインモデル。FW や ORM に依存せず、プロパティとメソッドを持つクラス)
└ entities/    … (TypeORM などの ORM と連携するためのエンティティ。「ドメインモデル」とほぼ同じだけど ORM 用のクラスが出来がち)
```

dddっぽく作ってるけど

- ハンドラー層: API Gatewayなどから入力を受け取り、バリデーションやオブジェクトの変換を行う
- ドメイン層: ユースケースに対するビジネスロジックとインタフェースを定義する
- インフラストラクチャ層: AWS SDKを利用したAWSサービスとのやりとりや外部APIへのアクセスを行う

## セキュリティ
[参考URL](https://expressjs.com/ja/advanced/best-practice-security.html)

以下のデフォルト対応はしている。
- 危険なheadを回避（helmet）
- JSON limit
- Rate limit（アプリケーション層でやるべきかもしれない）IPを拒否できる仕組みを実装したい。
- Validation

## 処理の流れ(OAuth)

マーメイドでやる

## 

```sh
client
↓
router
↓
rate-limit
↓
validation
↓
controller
↓
services（リソース分けする
↓
domain/entities db接続処理
↓
domain/models db接続処理終わったあとデータ格納
↓
controller
↓
ビルダー（defaultがnullで何か、enumを何かなど組み立てる部分）
↓
シリアライザー（jsonにシリアライズする。）
```

## error

- レスポンスについて
[これを参考](https://labs.goo.ne.jp/api_error_info/)

`{"error": {"code": 400, "message": "Invalid JSON"}}`

## エラーメッセージ
[参考URL](https://docs.oracle.com/cd/E82638_01/errmg/ORA-00000.html#GUID-27437B7F-F0C3-4F1F-9C6E-6780706FB0F6)

Oracleから拝借している## エラーメッセージ
[参考URL](https://docs.oracle.com/cd/E82638_01/errmg/ORA-00000.html#GUID-27437B7F-F0C3-4F1F-9C6E-6780706FB0F6)

Oracleから拝借している

## 時間とのやりとり

当サーバはUNIXタイムスタンプでやりとりをしています。
時間をリクエストに含む場合はUNIXタイムスタンプで送信してください。

## Test
[参考URL](https://qiita.com/uwattotaitai/items/149429774f9983296fa1)
以下をやりたい。
- localではdevとtestのdbを作成する
- testに関してはtest DBに接続する。

## Express 型拡張
[コード](https://github.com/tomnil/typedexpress/blob/master/src/index.ts)

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


## localでの開発について
[参考URL](https://zenn.dev/s_ryuuki/articles/5bbbeea5a88c0c#fnref-61c1-3)

## インフラストラクチャー
[これ](https://dev.classmethod.jp/articles/vendia-serverless-express/)


## 認証にJWTを利用した理由

>通常のトークン形式の認証では**トークンの正当性を確認するためにサーバへの問い合わせが必要。**
>JWTでは**公開鍵を利用してクライアント側でトークンの正当性を確認できる**という特徴がある。

上記の理由でJWTを採用
