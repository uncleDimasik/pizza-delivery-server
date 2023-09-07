import { Test, TestingModule } from '@nestjs/testing';
import { B2Resolver } from './b2.resolver';

describe('B2Resolver', () => {
  let resolver: B2Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [B2Resolver],
    }).compile();

    resolver = module.get<B2Resolver>(B2Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
