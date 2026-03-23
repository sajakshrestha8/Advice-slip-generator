import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdviceDto } from './dto/create-advice.dto';
import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Advice } from './entities/advice.entity';

@Injectable()
export class AdviceService {
  constructor(
    @InjectRepository(Advice)
    private readonly adviceRepo: Repository<Advice>,
  ) {}

  async create(createAdviceDto: CreateAdviceDto): Promise<Advice> {
    try {
      console.log('testing');
      console.log('Again');
      const advice = this.adviceRepo.create(createAdviceDto);
      return await this.adviceRepo.save(advice);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new InternalServerErrorException('Failed to create advice', error);
    }
  }

  async findRandom(): Promise<Advice> {
    try {
      const advices = await this.adviceRepo.find();
      const randomIndex = Math.floor(Math.random() * advices.length);
      return advices[randomIndex];
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new InternalServerErrorException('Failed to fetch advice', error);
    }
  }
}
