import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1774545001754 implements MigrationInterface {
  name = 'CreateUserTable1774545001754';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" varchar CHECK( "role" IN ('admin','user') ) NOT NULL DEFAULT ('user'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_advice" ("id" varchar PRIMARY KEY NOT NULL, "advice" text NOT NULL, "category" varchar CHECK( "category" IN ('career','relationship','health','finance','creativity','mindset') ) NOT NULL, "feeling" varchar CHECK( "feeling" IN ('motivated','calm','curious','anxious','happy','stuck') ) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_advice"("id", "advice", "category", "feeling", "createdAt", "updatedAt", "deletedAt") SELECT "id", "advice", "category", "feeling", "createdAt", "updatedAt", "deletedAt" FROM "advice"`,
    );
    await queryRunner.query(`DROP TABLE "advice"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_advice" RENAME TO "advice"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "advice" RENAME TO "temporary_advice"`,
    );
    await queryRunner.query(
      `CREATE TABLE "advice" ("id" varchar PRIMARY KEY NOT NULL, "advice" text NOT NULL, "category" varchar CHECK( "category" IN ('career','relationship','health','finance','creativity','mindset') ) NOT NULL, "feeling" varchar CHECK( "feeling" IN ('motivated','calm','curious','anxious','happy','stuck') ) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime)`,
    );
    await queryRunner.query(
      `INSERT INTO "advice"("id", "advice", "category", "feeling", "createdAt", "updatedAt", "deletedAt") SELECT "id", "advice", "category", "feeling", "createdAt", "updatedAt", "deletedAt" FROM "temporary_advice"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_advice"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
