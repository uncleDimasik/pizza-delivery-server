import { Test, TestingModule } from '@nestjs/testing';
import { CustomerDishResolver } from './customer-dish.resolver';
import { CustomerDishService } from './customer-dish.service';

describe('CustomerDishResolver', () => {
  let resolver: CustomerDishResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerDishResolver, CustomerDishService],
    }).compile();

    resolver = module.get<CustomerDishResolver>(CustomerDishResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
