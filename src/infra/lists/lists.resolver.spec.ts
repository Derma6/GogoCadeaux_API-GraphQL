import { Test, TestingModule } from '@nestjs/testing';
import { ListsResolver } from '@/infra/lists/lists.resolver';
import { ListService } from '@domain/list/list.service';

describe('ListsResolver', () => {
  let resolver: ListsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListsResolver, ListService],
    }).compile();

    resolver = module.get<ListsResolver>(ListsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
