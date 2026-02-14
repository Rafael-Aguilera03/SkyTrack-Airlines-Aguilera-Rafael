import { Test, TestingModule } from '@nestjs/testing';
import { VuelosController } from './vuelos.controller';

describe('VuelosController', () => {
  let controller: VuelosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VuelosController],
    }).compile();

    controller = module.get<VuelosController>(VuelosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
