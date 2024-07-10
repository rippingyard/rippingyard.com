import { Test, TestingModule } from '@nestjs/testing';
import { HttpController } from './http.controller';

describe('HttpController', () => {
  let controller: HttpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HttpController],
    }).compile();

    controller = module.get<HttpController>(HttpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
