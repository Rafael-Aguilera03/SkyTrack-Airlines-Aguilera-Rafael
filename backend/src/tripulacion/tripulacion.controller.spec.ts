import { Test, TestingModule } from '@nestjs/testing';
import { TripulacionController } from './tripulacion.controller';

describe('TripulacionController', () => {
  let controller: TripulacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripulacionController],
    }).compile();

    controller = module.get<TripulacionController>(TripulacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
