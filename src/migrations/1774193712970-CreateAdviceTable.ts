import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAdviceTable1774193712970 implements MigrationInterface {
  name = 'CreateAdviceTable1774193712970';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "advice" ("id" varchar PRIMARY KEY NOT NULL, "advice" text NOT NULL, "category" varchar CHECK( "category" IN ('career','relationship','health','finance','creativity','mindset') ) NOT NULL, "feeling" varchar CHECK( "feeling" IN ('motivated','calm','curious','anxious','happy','stuck') ) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "advice"`);
  }
}
