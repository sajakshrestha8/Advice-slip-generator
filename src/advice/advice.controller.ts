import { Controller, Get, Post, Body, UseGuards, Inject } from '@nestjs/common';
import { AdviceService } from './advice.service';
import { CreateAdviceDto } from './dto/create-advice.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import * as cacheManager_1 from 'cache-manager';
import { adviceConstants } from './constants';
import { Advice } from 'schemas/advice.schema';
import { pickRandoms } from './advice.utils';

@Controller('/v1/advice')
export class AdviceController {
  constructor(
    private readonly adviceService: AdviceService,
    @Inject(CACHE_MANAGER) private cacheManager: cacheManager_1.Cache,
  ) {}

  @Post()
  async create(@Body() createAdviceDto: CreateAdviceDto) {
    await this.cacheManager.del(adviceConstants.CACHE_KEY);
    return this.adviceService.create(createAdviceDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findRandom() {
    /**
     * Get cache at the inital step
     * If data is in the cache then return the data from the cache
     * If no then service returns the array of data and return the random data
     */
    let cachedAdvice = await this.cacheManager.get<Advice[]>(
      adviceConstants.CACHE_KEY,
    );

    if (!cachedAdvice) {
      cachedAdvice = await this.adviceService.findAll();

      await this.cacheManager.set(adviceConstants.CACHE_KEY, cachedAdvice);
    }

    const advice = pickRandoms(cachedAdvice);

    return advice;
  }

  /*
    Get advice from the category and feeling will be added soon.
  */
}
