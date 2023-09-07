import { Test, TestingModule } from '@nestjs/testing';
import { CustomerDishService } from './customer-dish.service';

describe('CustomerDishService', () => {
  let service: CustomerDishService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerDishService],
    }).compile();

    service = module.get<CustomerDishService>(CustomerDishService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
