import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AdviceService } from './advice.service';
import { CreateAdviceDto } from './dto/create-advice.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('advice')
export class AdviceController {
  constructor(private readonly adviceService: AdviceService) {}

  @Post()
  create(@Body() createAdviceDto: CreateAdviceDto) {
    return this.adviceService.create(createAdviceDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findRandom() {
    return this.adviceService.findRandom();
  }

  /*
    Get advice from the category and feeling will be added soon.
  */
}
