import { Test, TestingModule } from '@nestjs/testing';
import { fetchUrlService } from './fetchUrl.service';

describe('fetchUrlService', () => {
  let service: fetchUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [fetchUrlService],
    }).compile();

    service = module.get<fetchUrlService>(fetchUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
