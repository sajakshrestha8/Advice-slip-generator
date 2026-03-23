import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdviceModule } from './advice/advice.module';
import { Advice } from 'schemas/advice.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

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
    ThrottlerModule.forRoot({
      /*
        Currently, the rate limit is for 60min i.e, 1 hour.
        ttl - time to leave takes time in milisecond.
        For the development purpose the limit is 10 request per hour, will update during the production environment.
      */
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
