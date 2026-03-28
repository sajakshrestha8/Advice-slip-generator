import { Controller, Get, Post, Body, UseGuards, Inject } from '@nestjs/common';
import { AdviceService } from './advice.service';
import { CreateAdviceDto } from './dto/create-advice.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import * as cacheManager_1 from 'cache-manager';
import { adviceConstants } from './constants';

@Controller('/v1/advice')
export class AdviceController {
  constructor(
    private readonly adviceService: AdviceService,
    @Inject(CACHE_MANAGER) private cacheManager: cacheManager_1.Cache,
  ) {}

  @Post()
  create(@Body() createAdviceDto: CreateAdviceDto) {
    return this.adviceService.create(createAdviceDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findRandom() {
    const cachedAdvice = await this.cacheManager.get(adviceConstants.CACHE_KEY);

    if (cachedAdvice) return cachedAdvice;

    const advice = this.adviceService.findRandom();

    await this.cacheManager.set(adviceConstants.CACHE_KEY, advice);

    return advice;
  }

  /*
    Get advice from the category and feeling will be added soon.
  */
}
