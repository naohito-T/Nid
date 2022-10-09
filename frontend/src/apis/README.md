# Apis

```sh
apis
├── resources # 認可の役割（つまりadmin, guest, user）でのリソースを分けるイメージ。servicesから各resourceによって接続するapiを選定
└── services # 各サービスごとの接続apiをまとめる。
```

最終的には
apiから使用？