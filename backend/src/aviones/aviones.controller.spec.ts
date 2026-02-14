import { Test, TestingModule } from '@nestjs/testing';
import { AvionesController } from './aviones.controller';

describe('AvionesController', () => {
  let controller: AvionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvionesController],
    }).compile();

    controller = module.get<AvionesController>(AvionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
