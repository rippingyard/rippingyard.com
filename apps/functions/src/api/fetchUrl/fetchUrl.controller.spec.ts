import { Test, TestingModule } from '@nestjs/testing';
import { fetchUrlController } from './fetchUrl.controller';

describe('fetchUrlController', () => {
  let controller: fetchUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [fetchUrlController],
    }).compile();

    controller = module.get<fetchUrlController>(fetchUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
