import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdviceModule } from './advice/advice.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://shresthasajak123:sajakshrestha@learningnode.uic3kqo.mongodb.net/?appName=LearningNode',
    ),
    AdviceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
