import { Test, TestingModule } from '@nestjs/testing';
import { AdviceController } from './advice.controller';
import { AdviceService } from './advice.service';
import { AuthGuard } from '../auth/auth.guard';

describe('AdviceController', () => {
  let controller: AdviceController;

  const mockAdviceService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  const mockAuthGuard = {
    canActivate: jest.fn().mockReturnValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdviceController],
      providers: [
        {
          provide: AdviceService,
          useValue: mockAdviceService,
        },
        {
          provide: AuthGuard,
          useValue: mockAuthGuard,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<AdviceController>(AdviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
