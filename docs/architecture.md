# Architecture

個人で使う程度のためserverlessでいい。
albを理解するためのProject

## Purpose

naohito-T Provides login functionality for client projects.

## Backend

serverless-frameworkにする。

### localstack

[参考URL](https://qiita.com/mmclsntr/items/709863ba98a4855988f3)
[これも採用](https://zenn.dev/dove/articles/c0bc8aca695f07)

http://localhost:24566/
`{"status": "running"}`

- Dynamodb
http://localhost:4569
- S3
http://localhost:4572
- ses
http://localhost:4579
- sqs
http://localhost:4576

### TypeORM
[CLI Document](https://orkhan.gitbook.io/typeorm/docs/using-cli)

---

## Frontend

Project start.
`npx create-next-app@latest frontend --ts`
