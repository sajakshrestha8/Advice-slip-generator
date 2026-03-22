import { Module } from '@nestjs/common';
import { AdviceController } from './advice.controller';
import { AdviceService } from './advice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advice } from 'schemas/advice.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Advice])],
  controllers: [AdviceController],
  providers: [AdviceService],
})
export class AdviceModule {}
