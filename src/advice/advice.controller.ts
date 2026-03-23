import { Controller, Get, Post, Body } from '@nestjs/common';
import { AdviceService } from './advice.service';
import { CreateAdviceDto } from './dto/create-advice.dto';

@Controller('advice')
export class AdviceController {
  constructor(private readonly adviceService: AdviceService) {}

  @Post()
  create(@Body() createAdviceDto: CreateAdviceDto) {
    return this.adviceService.create(createAdviceDto);
  }

  @Get()
  findRandom() {
    return this.adviceService.findRandom();
  }

  /*
    Get advice from the category and feeling will be added soon.
  */
}
