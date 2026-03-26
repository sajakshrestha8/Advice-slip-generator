import { Advice } from 'schemas/advice.schema';
import { User } from 'schemas/user.schema';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'db.sqlite',
  entities: [Advice, User],
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  synchronize: false,
});
