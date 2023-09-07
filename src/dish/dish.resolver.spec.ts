import { Test, TestingModule } from '@nestjs/testing';
import { DishResolver } from './dish.resolver';
import { DishService } from './dish.service';

describe('DishResolver', () => {
  let resolver: DishResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DishResolver, DishService],
    }).compile();

    resolver = module.get<DishResolver>(DishResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
