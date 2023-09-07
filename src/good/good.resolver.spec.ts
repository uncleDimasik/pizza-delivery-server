import { Test, TestingModule } from '@nestjs/testing';
import { GoodResolver } from './good.resolver';
import { GoodService } from './good.service';

describe('GoodResolver', () => {
  let resolver: GoodResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoodResolver, GoodService],
    }).compile();

    resolver = module.get<GoodResolver>(GoodResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
