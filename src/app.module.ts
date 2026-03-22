import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdviceModule } from './advice/advice.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advice } from 'schemas/advice.schema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db.sqlite',
      entities: [Advice],
      migrations: ['dist/src/migrations/*{.ts,.js}'],
      synchronize: false,
    }),
    AdviceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
