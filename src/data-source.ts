import { Advice } from 'schemas/advice.schema';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'db.sqlite',
  entities: [Advice],
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  synchronize: false,
});
