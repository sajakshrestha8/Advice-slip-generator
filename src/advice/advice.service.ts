import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdviceDto } from './dto/create-advice.dto';
import { UpdateAdviceDto } from './dto/update-advice.dto';
import { Advice } from 'schemas/advice.schema';
import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AdviceService {
  constructor(
    @InjectRepository(Advice)
    private readonly adviceRepo: Repository<Advice>,
  ) {}

  async create(createAdviceDto: CreateAdviceDto) {
    try {
      const advice = this.adviceRepo.create(createAdviceDto);
      return await this.adviceRepo.save(advice);
    } catch (error) {
      throw new InternalServerErrorException('Failed to add advice', error);
    }
  }

  findAll() {
    return `This action returns all advice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} advice`;
  }

  update(id: number, updateAdviceDto: UpdateAdviceDto) {
    return `This action updates a #${id} advice`;
  }

  remove(id: number) {
    return `This action removes a #${id} advice`;
  }
}
