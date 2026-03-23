import { Test, TestingModule } from '@nestjs/testing';
import { AdviceController } from './advice.controller';
import { AdviceService } from './advice.service';

describe('AdviceController', () => {
  let controller: AdviceController;

  const mockAdviceService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdviceController],
      providers: [
        {
          provide: AdviceService, // 👈 mock the service
          useValue: mockAdviceService,
        },
      ],
    }).compile();

    controller = module.get<AdviceController>(AdviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
