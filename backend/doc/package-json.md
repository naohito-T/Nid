# Package.json Description

## cookie-parser

セッションIDと呼ばれる値がCookieに保存されます。
クライアントからサーバに再アクセスする際、リクエストヘッダのCookieにセッションIDを指定します。
リクエストヘッダに指定されたCookieを読み取るために cookie-parser が必要となります。
サーバ側ではCookieから読み取ったセッションIDを利用してセッション情報にアクセスします。
