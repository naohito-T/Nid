import { MigrationInterface, QueryRunner } from "typeorm";

export class init1669080808389 implements MigrationInterface {
    name = 'init1669080808389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_addresses" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(), "zip_code" character varying NOT NULL, "prefecture" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "building" character varying, "user_id" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_8abbeb5e3239ff7877088ffc25b" PRIMARY KEY ("id")); COMMENT ON COLUMN "user_addresses"."zip_code" IS '郵便番号'; COMMENT ON COLUMN "user_addresses"."prefecture" IS '都道府県'; COMMENT ON COLUMN "user_addresses"."city" IS '市区町村'; COMMENT ON COLUMN "user_addresses"."street" IS '番地など'; COMMENT ON COLUMN "user_addresses"."building" IS 'アパート・マンション名等（任意）'`);
        await queryRunner.query(`CREATE TYPE "public"."user_authorizations_identity_type_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "user_authorizations" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(), "identity_type" "public"."user_authorizations_identity_type_enum" NOT NULL, "identifier" integer NOT NULL, "password" character varying NOT NULL, "credential" integer NOT NULL, "user_id" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_8423c12df4a969b587e44757401" PRIMARY KEY ("id")); COMMENT ON COLUMN "user_authorizations"."identity_type" IS 'ログインタイプ(メール、 Githubなど)'; COMMENT ON COLUMN "user_authorizations"."identifier" IS '該当ログインタイプの識別子(メールアドレス、 githubユーザー名など)'; COMMENT ON COLUMN "user_authorizations"."password" IS 'パスワード'; COMMENT ON COLUMN "user_authorizations"."credential" IS 'クレデンシャル(外部サービス発行されたtoken,認証コードなど)'`);
        await queryRunner.query(`CREATE TABLE "terms" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(), "term_version" TIMESTAMP(3) DEFAULT now(), "user_id" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_e3371ddb00d1d22b2ee73a576f" UNIQUE ("userId"), CONSTRAINT "PK_33b6fe77d6ace7ff43cc8a65958" PRIMARY KEY ("id")); COMMENT ON COLUMN "terms"."term_version" IS '利用規約の最新versionを保持する（時間orTimeStamp）'`);
        await queryRunner.query(`CREATE TYPE "public"."users_sex_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "birth_date" TIMESTAMP, "sex" "public"."users_sex_enum" NOT NULL, "nick_name" character varying NOT NULL, "telephone_number" character varying NOT NULL, "email" character varying NOT NULL, "thumbnail_url" character varying, "user_addresses" character varying array, "user_authorization" character varying array NOT NULL, "has_terms_version" TIMESTAMP array, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."first_name" IS '苗字'; COMMENT ON COLUMN "users"."last_name" IS '名前'; COMMENT ON COLUMN "users"."birth_date" IS '生年月日'; COMMENT ON COLUMN "users"."sex" IS '性別 0: 男性 1: 女性 2: 回答なし'; COMMENT ON COLUMN "users"."nick_name" IS 'ニックネーム'; COMMENT ON COLUMN "users"."telephone_number" IS '電話番号'; COMMENT ON COLUMN "users"."email" IS 'メールアドレス'; COMMENT ON COLUMN "users"."thumbnail_url" IS 'サムネイル'; COMMENT ON COLUMN "users"."user_addresses" IS 'ユーザが持っている住所（複数持てる）'; COMMENT ON COLUMN "users"."user_authorization" IS '認証したフロー（複数ある想定）'; COMMENT ON COLUMN "users"."has_terms_version" IS '同意している利用規約のversion（空白の場合は同意していないと同義）'`);
        await queryRunner.query(`CREATE INDEX "IDX_41151d5f469f3bf18cca2fda6f" ON "users" ("nick_name") `);
        await queryRunner.query(`ALTER TABLE "user_addresses" ADD CONSTRAINT "FK_781afdedafe920f331f6229cb62" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_authorizations" ADD CONSTRAINT "FK_d1c7e422d77dd49a01c4f509145" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "terms" ADD CONSTRAINT "FK_e3371ddb00d1d22b2ee73a576fc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "terms" DROP CONSTRAINT "FK_e3371ddb00d1d22b2ee73a576fc"`);
        await queryRunner.query(`ALTER TABLE "user_authorizations" DROP CONSTRAINT "FK_d1c7e422d77dd49a01c4f509145"`);
        await queryRunner.query(`ALTER TABLE "user_addresses" DROP CONSTRAINT "FK_781afdedafe920f331f6229cb62"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41151d5f469f3bf18cca2fda6f"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_sex_enum"`);
        await queryRunner.query(`DROP TABLE "terms"`);
        await queryRunner.query(`DROP TABLE "user_authorizations"`);
        await queryRunner.query(`DROP TYPE "public"."user_authorizations_identity_type_enum"`);
        await queryRunner.query(`DROP TABLE "user_addresses"`);
    }

}
