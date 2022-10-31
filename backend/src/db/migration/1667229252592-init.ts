import { MigrationInterface, QueryRunner } from "typeorm";

export class init1667229252592 implements MigrationInterface {
    name = 'init1667229252592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_addresses" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "zip_code" character varying NOT NULL, "prefecture" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "building" character varying, "user_id" uuid NOT NULL, CONSTRAINT "PK_8abbeb5e3239ff7877088ffc25b" PRIMARY KEY ("id")); COMMENT ON COLUMN "user_addresses"."zip_code" IS '郵便番号'; COMMENT ON COLUMN "user_addresses"."prefecture" IS '都道府県'; COMMENT ON COLUMN "user_addresses"."city" IS '市区町村'; COMMENT ON COLUMN "user_addresses"."street" IS '番地など'; COMMENT ON COLUMN "user_addresses"."building" IS 'アパート・マンション名等（任意）'`);
        await queryRunner.query(`CREATE TYPE "public"."users_sex_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "age" integer NOT NULL, "sex" "public"."users_sex_enum" NOT NULL, "nick_name" character varying NOT NULL, "telephone_number" character varying NOT NULL, "thumbnail_url" character varying, "has_terms_version" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."first_name" IS '苗字'; COMMENT ON COLUMN "users"."last_name" IS '名前'; COMMENT ON COLUMN "users"."age" IS '年齢'; COMMENT ON COLUMN "users"."sex" IS '性別 0: 男性 1: 女性 2: 回答なし'; COMMENT ON COLUMN "users"."nick_name" IS 'ニックネーム'; COMMENT ON COLUMN "users"."telephone_number" IS '電話番号'; COMMENT ON COLUMN "users"."thumbnail_url" IS 'サムネイル'; COMMENT ON COLUMN "users"."has_terms_version" IS '同意している利用規約のversion（空白の場合は同意していないと同義）'`);
        await queryRunner.query(`CREATE INDEX "IDX_41151d5f469f3bf18cca2fda6f" ON "users" ("nick_name") `);
        await queryRunner.query(`ALTER TABLE "user_addresses" ADD CONSTRAINT "FK_7a5100ce0548ef27a6f1533a5ce" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_addresses" DROP CONSTRAINT "FK_7a5100ce0548ef27a6f1533a5ce"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41151d5f469f3bf18cca2fda6f"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_sex_enum"`);
        await queryRunner.query(`DROP TABLE "user_addresses"`);
    }

}
