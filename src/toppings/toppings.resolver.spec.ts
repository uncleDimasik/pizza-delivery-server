import { Test, TestingModule } from '@nestjs/testing';
import { ToppingsResolver } from './toppings.resolver';
import { ToppingsService } from './toppings.service';

describe('ToppingsResolver', () => {
  let resolver: ToppingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToppingsResolver, ToppingsService],
    }).compile();

    resolver = module.get<ToppingsResolver>(ToppingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
